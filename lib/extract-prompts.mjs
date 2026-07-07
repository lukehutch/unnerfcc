#!/usr/bin/env node
// extract-prompts.mjs — unnerfcc's own prompt-catalog extractor.
//
// Parses a Claude Code JS bundle (cli.js, minified or un-minified) with
// @babel/parser and emits a catalog:
//   { version, prompts: [ { name, id, description, pieces, identifiers,
//                            identifierMap, version } ] }
//
// The `pieces` computation is deliberately mechanical so that
// sha256(pieces.join('')) is stable across bundle rebuilds and across
// extractor runs — that identity hash is how our relabel step carries
// name/id/description forward for unchanged prompts.
//
// This is our own code — no tweakcc lineage.
//
// CLI:  node extract-prompts.mjs <cli.js> <out-catalog.json>
//   - reads the CC version from a package.json sibling of <cli.js>
//   - if <out-catalog.json> already exists it is IGNORED (seeding /
//     carry-forward is a separate script's job)

import { readFileSync, writeFileSync, existsSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parse } from '@babel/parser';

// ---------------------------------------------------------------------------
// Escape decoding for template-literal raw text.
//
// Template literals in the bundle are captured as RAW source between the
// backticks (real newlines and tabs come through as real characters). We
// decode only \uHHHH, \u{...} and \xHH escapes to their actual character,
// and PRESERVE \\, \n, \t, \" and \` verbatim (matching the reference
// storage format). A leading backslash-run is consumed left-to-right so a
// literal "\\u0041" (escaped backslash then text) is preserved, not decoded.
// ---------------------------------------------------------------------------
function decodeRawEscapes(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c !== '\\') { out += c; continue; }
    const n = s[i + 1];
    if (n === undefined) { out += c; continue; }
    // Preserve these verbatim (keep the backslash and the following char).
    if (n === '\\' || n === 'n' || n === 't' || n === '"' || n === '`') {
      out += c + n;
      i += 1;
      continue;
    }
    if (n === 'u') {
      if (s[i + 2] === '{') {
        const end = s.indexOf('}', i + 3);
        if (end !== -1) {
          const hex = s.slice(i + 3, end);
          if (/^[0-9a-fA-F]+$/.test(hex)) {
            try {
              out += String.fromCodePoint(parseInt(hex, 16));
              i = end;
              continue;
            } catch { /* fall through */ }
          }
        }
      } else {
        const hex = s.slice(i + 2, i + 6);
        if (/^[0-9a-fA-F]{4}$/.test(hex)) {
          out += String.fromCharCode(parseInt(hex, 16));
          i += 5;
          continue;
        }
      }
    } else if (n === 'x') {
      const hex = s.slice(i + 2, i + 4);
      if (/^[0-9a-fA-F]{2}$/.test(hex)) {
        out += String.fromCharCode(parseInt(hex, 16));
        i += 3;
        continue;
      }
    }
    // Any other escape (e.g. \r, \0, \/, \') — keep verbatim.
    out += c + n;
    i += 1;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Version / build-time normalization so churn doesn't create spurious diffs.
// ---------------------------------------------------------------------------
function normalizeVersion(s, version) {
  let out = s;
  if (version) {
    // Escape regex metachars in the version (the dots).
    const v = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(new RegExp(v, 'g'), '<<CCVERSION>>');
  }
  // BUILD_TIME:"...Z" ISO timestamp.
  out = out.replace(/BUILD_TIME:"[^"]*Z"/g, 'BUILD_TIME:"<<BUILD_TIME>>"');
  return out;
}

// ---------------------------------------------------------------------------
// Collect top-level identifier occurrences within a `${...}` interpolation.
//
// Returns an ordered list of { name, start, end } (absolute source offsets).
// Only the identifier NAME span is excised from the surrounding literal text;
// member accessors (.x), call parens (()), etc. stay in the literal pieces.
//
//   Identifier            A            -> record A
//   MemberExpression      A.b          -> recurse OBJECT only (record A)
//   CallExpression        f(a, b)      -> recurse callee + args
//   TemplateLiteral       `...${e}...` -> recurse its expressions
//   ObjectExpression      {k: v}       -> recurse property VALUES only
// ---------------------------------------------------------------------------
function collectIdentifiers(node, acc) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { for (const n of node) collectIdentifiers(n, acc); return; }
  if (typeof node.type !== 'string') return;

  switch (node.type) {
    case 'Identifier':
      acc.push({ name: node.name, start: node.start, end: node.end });
      return;
    case 'MemberExpression':
    case 'OptionalMemberExpression':
      // Recurse the OBJECT only ("A.b" records A). A computed property
      // (A[expr]) still recurses only the object — the property name is not
      // a slot.
      collectIdentifiers(node.object, acc);
      return;
    case 'ObjectExpression':
      // Recurse property VALUES only (keys are not slots).
      for (const prop of node.properties || []) {
        if (prop.type === 'ObjectProperty' || prop.type === 'Property') {
          if (prop.computed) collectIdentifiers(prop.key, acc);
          collectIdentifiers(prop.value, acc);
        } else if (prop.type === 'SpreadElement') {
          collectIdentifiers(prop.argument, acc);
        }
      }
      return;
    default:
      break;
  }

  // Generic recursion into every child expression node (covers
  // CallExpression, ConditionalExpression, Binary/LogicalExpression,
  // TemplateLiteral, UnaryExpression, ArrayExpression, arrow bodies, etc.).
  for (const key in node) {
    if (key === 'type' || key === 'start' || key === 'end' ||
        key === 'loc' || key === 'range' || key === 'leadingComments' ||
        key === 'trailingComments' || key === 'innerComments' ||
        key === 'extra') continue;
    const child = node[key];
    if (child && typeof child === 'object') collectIdentifiers(child, acc);
  }
}

// ---------------------------------------------------------------------------
// Build pieces / identifiers / identifierMap for a node.
// ---------------------------------------------------------------------------
function buildStringLiteral(node, version) {
  // node.value is already fully decoded by babel — use it as-is, then
  // normalize version churn.
  const piece = normalizeVersion(node.value, version);
  return { pieces: [piece], identifiers: [], identifierMap: {}, names: [] };
}

// A RUN of PURE string parts joined by `+` — parts quoted ANY way (single/double-
// quoted literals AND backtick templates with NO interpolation) — folded into ONE
// contiguous decoded string. So a prompt the bundler split across a `+` chain of
// whatever quote mix is located, fingerprinted, and patched as one string.
//
// A `+` operand that is NOT a pure string — a bare variable (`"a"+x+"b"`), a call,
// or a backtick WITH a ${…} slot — stops the fold: the run is left as its separate
// parts (extracted individually). Rationale: those interpolate a RUNTIME VALUE, not
// authored prompt text, and in this bundle they are overwhelmingly library/error
// strings ("… "+err.code+" …"), not prompts. Keeping them separate is the
// consistent rule — ANY variable-separation ⇒ no fold — and it also keeps ~300
// library error-message runs out of the catalog. A genuine prompt that needs a slot
// is authored as a single template literal, which buildTemplateLiteral handles.
function concatValue(node) {
  if (!node || typeof node.type !== 'string') return null;
  if (node.type === 'StringLiteral') return node.value;
  if (node.type === 'TemplateLiteral' && (node.expressions || []).length === 0) {
    return decodeRawEscapes(node.quasis[0].value.raw);
  }
  if (node.type === 'BinaryExpression' && node.operator === '+') {
    const l = concatValue(node.left);
    if (l === null) return null;
    const r = concatValue(node.right);
    if (r === null) return null;
    return l + r;
  }
  return null; // bare variable / call / template-with-interp ⇒ not a pure-string run
}
function buildConcatRun(node, version) {
  if (node.type !== 'BinaryExpression' || node.operator !== '+') return null;
  const v = concatValue(node);
  if (v === null) return null; // any variable-separation ⇒ leave the parts separate
  return { pieces: [normalizeVersion(v, version)], identifiers: [], identifierMap: {}, names: [], hasInterp: false };
}

function buildTemplateLiteral(node, code, version) {
  const rawStart = node.start + 1; // just inside opening backtick
  const raw = code.substring(rawStart, node.end - 1);

  // Gather identifier occurrences across all interpolations.
  const ids = [];
  for (const expr of node.expressions || []) collectIdentifiers(expr, ids);
  ids.sort((a, b) => a.start - b.start);

  // Split the raw text around each identifier name span. The `${` stays at
  // the tail of the preceding piece and `}` at the head of the next piece —
  // only the identifier name is excised.
  const pieces = [];
  let lastPos = 0;
  for (const id of ids) {
    const relStart = id.start - rawStart;
    const relEnd = id.end - rawStart;
    pieces.push(raw.substring(lastPos, relStart));
    lastPos = relEnd;
  }
  pieces.push(raw.substring(lastPos));

  // Decode escapes then normalize version on each piece.
  const decoded = pieces.map((p) => normalizeVersion(decodeRawEscapes(p), version));

  // Label-encode identifier names: number unique names by first appearance.
  const nameToIndex = new Map();
  const identifiers = [];
  for (const id of ids) {
    if (!nameToIndex.has(id.name)) nameToIndex.set(id.name, nameToIndex.size);
    identifiers.push(nameToIndex.get(id.name));
  }
  const identifierMap = {};
  for (let i = 0; i < nameToIndex.size; i++) identifierMap[String(i)] = '';

  // `names`: the minified identifier at EACH slot, in order (ids[i].name). The
  // extractor doesn't need it (it label-encodes), but the patcher does — to map
  // the .md body's human placeholder names onto THIS node's actual variables.
  const names = ids.map((id) => id.name);
  return { pieces: decoded, identifiers, identifierMap, names };
}

// ---------------------------------------------------------------------------
// Unified node -> {pieces, identifiers, identifierMap, names} for the THREE
// string-producing encodings — used by BOTH the extractor and the patcher so
// they locate/reconstruct a prompt the SAME way regardless of how the bundle
// happens to encode it: single/double-quoted literal, backtick template, or a
// pure `+`-concatenation chain. Returns null for a non-string node.
//
// The returned `pieces` are encoding- and minification-normalized (quotes and
// escapes decoded, per-build identifier names excised), so two nodes that hold
// the same content — even encoded differently — produce identical `pieces` and
// therefore hash to the same catalog key.
// ---------------------------------------------------------------------------
export function siteFromNode(node, code, version) {
  if (!node || typeof node.type !== 'string') return null;
  if (node.type === 'StringLiteral') return buildStringLiteral(node, version);
  if (node.type === 'TemplateLiteral') return buildTemplateLiteral(node, code, version);
  if (node.type === 'BinaryExpression' && node.operator === '+') return buildConcatRun(node, version);
  return null;
}

export { buildStringLiteral, buildTemplateLiteral, buildConcatRun, normalizeVersion, decodeRawEscapes };

// ---------------------------------------------------------------------------
// Inclusion heuristic. We want a SUPERSET of the reference's model-facing
// prose/templates (over-inclusion is harmless; missing a long system prompt
// is not). Excludes obvious non-prompt emission sites and blob content.
// ---------------------------------------------------------------------------
// Natural-language signal: three consecutive lowercase words. Minified code,
// URLs, regexes, paths, base64 rarely produce this; English prose almost
// always does. This is the primary discriminator for model-facing text.
const NL_RUN = /[a-z]{2,}\s+[a-z]{2,}\s+[a-z]{2,}/;
// A sentence boundary: terminal punctuation followed by space, a newline, OR
// terminal punctuation at the very END of the string (a complete one-liner like
// "Your responses should be short and concise." — a real model directive the
// `[.!?:]\s` form misses because nothing follows the final period). Over-matching
// here is harmless: the seed-driven catalog diverts any non-prompt to candidates.
const SENTENCE_BOUNDARY = /[.!?:]\s|\n|[.!?]["')\]]?\s*$/;

// Context markers (searched in the ~140 chars before the node) that indicate
// a model-facing emission site (used as an additional includer).
const CONTEXT_INCLUDE = [
  /description\s*:\s*$/i,        // description: "..."  (schema field)
  /descriptionForModel\s*:\s*$/i,
  /whenToUse\s*:\s*$/i,
  /prompt\s*:\s*$/i,
  /systemPrompt\s*:\s*$/i,
  /instructions?\s*:\s*$/i,
  /text\s*:\s*$/i,              // {type:"text",text:"..."}
  /\.describe\(\s*$/i,
  /content\s*:\s*$/i,
];

// Emission sites that are never model-facing prompts.
const CONTEXT_EXCLUDE = [
  /\bthrow\s*$/,
  /new\s+[A-Za-z_$][\w$]*Error\s*\(\s*$/,
  /console\s*\.\s*[a-z]+\s*\(\s*$/,
  /\.\s*(createElement|option|command|alias|usage|action|description)\s*\(\s*$/,
  /process\s*\.\s*std(out|err)\s*\.\s*write\s*\(\s*$/,
  /\brequire\s*\(\s*$/,
  /\bimport\s*\(\s*$/,
];

function looksLikeBlob(v) {
  if (v.startsWith('#!/usr/bin/env')) return true;
  if (v.startsWith('<!DOCTYPE') || v.startsWith('<!doctype')) return true;
  if (v.startsWith('(()=>{') || v.startsWith('(function')) return true;
  if (v.startsWith('data:')) return true;
  // Long unbroken base64/hex/token blob with no whitespace.
  if (v.length > 80 && !/\s/.test(v) && /^[A-Za-z0-9+/=_-]+$/.test(v)) return true;
  return false;
}

function qualifies(value, contextBefore) {
  if (typeof value !== 'string') return false;
  if (value.length < 40) return false;
  if (looksLikeBlob(value)) return false;

  for (const re of CONTEXT_EXCLUDE) if (re.test(contextBefore)) return false;

  // 1) Markdown header or frontmatter block.
  if (/^\s*#{1,6}\s/.test(value)) return true;
  if (/^\s*---\s*\n/.test(value)) return true;
  // 2) Natural-language prose (three consecutive lowercase words) that is
  //    either sentence-punctuated / multi-line, or substantial enough to be
  //    clearly prose (>= 16 word tokens). The latter catches real tool
  //    descriptions like "All commands MUST run in sandbox mode - the `flag`
  //    …" that lack an early . / : / newline, without dragging in the many
  //    short error/validation strings that have a couple of words.
  if (NL_RUN.test(value)) {
    if (SENTENCE_BOUNDARY.test(value)) return true;
    const words = value.match(/[A-Za-z][A-Za-z'-]+/g);
    if (words && words.length >= 16) return true;
  }
  // 3) Model-facing context marker + at least a short prose run.
  for (const re of CONTEXT_INCLUDE) {
    if (re.test(contextBefore) && NL_RUN.test(value)) return true;
  }

  return false;
}

// For a TemplateLiteral, the heuristic probe is the RAW source between the
// backticks. Using raw (rather than only the cooked quasis) means prose that
// lives inside an interpolation — e.g. `${cond ? "Provide a concise …" : ""}`
// — still counts toward the natural-language signal. Any extra false
// positives this introduces are harmless over-inclusion.
function templateProbeText(node, code) {
  return code.substring(node.start + 1, node.end - 1);
}

// ---------------------------------------------------------------------------
// Main extraction: recursively visit every node.
// ---------------------------------------------------------------------------
// includeAll: emit EVERY string/template literal (minus obvious binary blobs)
// that is >=24 chars and has whitespace — for the SHA-256 classification
// pipeline, where Claude (not a guess) decides prompt vs non-prompt.
// all: emit EVERY non-blob string/template literal >= ALL_MIN chars, with NO
// length/whitespace/URL/path filter — for gen-catalog's SEED-MATCHING, where
// the seed is the whitelist so over-inclusion is harmless (only seed-matched
// prompts are carried) and RECALL is what matters. This rescues short/structural
// prompts ("[Thinking removed]", "<bash-input>${}</bash-input>", "No files
// found") that the >=24+whitespace filter drops but that ARE real seed prompts,
// letting them match by EXACT identity hash instead of a fragile bundle-text
// probe. Keeping it a SEPARATE mode (not lowering includeAll) leaves the Claude
// classification cost unchanged. Default false keeps the heuristic path.
export function extract(code, version, { includeAll = false, all = false } = {}) {
  // Short floor for `all` mode: recall is flat below ~10 chars (measured), so a
  // small floor trims single-token/char noise without dropping any seed prompt.
  const ALL_MIN = 8;
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
    errorRecovery: true,
  });

  const out = [];
  const seen = new Set(); // dedupe by exact source span (a node is visited once)

  const visit = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { for (const n of node) visit(n); return; }
    if (typeof node.type !== 'string') return;

    // A PURE-string `+`-run (any quote mix, no interpolation) — catalog the whole
    // FOLDED run as ONE contiguous string; its leaf parts are subsumed, so we do NOT
    // recurse into them. A run with any variable/interpolation operand isn't foldable
    // → buildConcatRun returns null and we fall through to generic recursion, which
    // keeps the parts separate (they interpolate a runtime value, not prompt text).
    if (node.type === 'BinaryExpression' && node.operator === '+') {
      const built = buildConcatRun(node, version);
      if (built) {
        const key = node.start + ':' + node.end + ':concat';
        if (!seen.has(key)) {
          seen.add(key);
          const probe = built.pieces.join('');
          const contextBefore = code.substring(Math.max(0, node.start - 140), node.start);
          const include = all
            ? (probe.length >= ALL_MIN && !looksLikeBlob(probe))
            : includeAll
            ? (probe.length >= 24 && /\s/.test(probe.trim()) && !looksLikeBlob(probe) &&
               !/^https?:\/\/\S+$/.test(probe.trim()) && !/^[\/~][\w./-]+$/.test(probe.trim()))
            : qualifies(probe, contextBefore);
          if (include) {
            out.push({ name: '', id: '', description: '', pieces: built.pieces,
                       identifiers: built.identifiers, identifierMap: built.identifierMap, version });
          }
        }
        return; // pure-string leaves are subsumed — not re-visited
      }
      // not foldable — fall through to generic recursion (keeps the parts)
    }

    if (node.type === 'StringLiteral' || node.type === 'TemplateLiteral') {
      const key = node.start + ':' + node.end + ':' + node.type;
      if (!seen.has(key)) {
        seen.add(key);
        const ctxStart = Math.max(0, node.start - 140);
        const contextBefore = code.substring(ctxStart, node.start);
        const probe =
          node.type === 'StringLiteral' ? node.value : templateProbeText(node, code);
        // includeAll: STRUCTURAL pre-filter only — keep anything that could be
        // prose for Claude to classify, drop only what is *definitionally* not a
        // prompt (no whitespace = a single token/identifier; too short; a blob;
        // a bare URL/path). This is NOT a "looks like a prompt" guess — it just
        // removes non-prose so the classification set is tractable.
        const include = all
          ? (probe.length >= ALL_MIN && !looksLikeBlob(probe))
          : includeAll
          ? (probe.length >= 24 && /\s/.test(probe.trim()) && !looksLikeBlob(probe) &&
             !/^https?:\/\/\S+$/.test(probe.trim()) && !/^[\/~][\w./-]+$/.test(probe.trim()))
          : qualifies(probe, contextBefore);
        if (include) {
          const built =
            node.type === 'StringLiteral'
              ? buildStringLiteral(node, version)
              : buildTemplateLiteral(node, code, version);
          out.push({
            name: '',
            id: '',
            description: '',
            pieces: built.pieces,
            identifiers: built.identifiers,
            identifierMap: built.identifierMap,
            version,
          });
        }
      }
      // Still recurse into template expressions (they may contain nested
      // qualifying literals).
      if (node.type === 'TemplateLiteral') {
        for (const e of node.expressions || []) visit(e);
      }
      return;
    }

    // Generic recursion over child nodes.
    for (const key in node) {
      if (key === 'type' || key === 'start' || key === 'end' ||
          key === 'loc' || key === 'range' || key === 'leadingComments' ||
          key === 'trailingComments' || key === 'innerComments') continue;
      const child = node[key];
      if (child && typeof child === 'object') visit(child);
    }
  };

  visit(ast.program);
  return out;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function readVersion(cliPath) {
  const pkgPath = join(dirname(cliPath), 'package.json');
  if (!existsSync(pkgPath)) {
    throw new Error(`package.json not found next to ${cliPath} (expected ${pkgPath})`);
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  if (!pkg.version) throw new Error(`no "version" field in ${pkgPath}`);
  return pkg.version;
}

function main() {
  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const includeAll = args.includes('--include-all');
  const [cliPath, outPath] = args.filter((a) => !a.startsWith('--'));
  if (!cliPath || !outPath) {
    console.error('usage: node extract-prompts.mjs <cli.js> <out-catalog.json> [--all|--include-all]');
    process.exit(2);
  }
  const version = readVersion(cliPath);
  const code = readFileSync(cliPath, 'utf8');

  const prompts = extract(code, version, { all, includeAll });

  // Deterministic ordering: by pieces.join, then by identifiers signature.
  prompts.sort((a, b) => {
    const ja = a.pieces.join('');
    const jb = b.pieces.join('');
    if (ja < jb) return -1;
    if (ja > jb) return 1;
    const ia = a.identifiers.join(',');
    const ib = b.identifiers.join(',');
    return ia < ib ? -1 : ia > ib ? 1 : 0;
  });

  const catalog = { version, prompts };
  writeFileSync(outPath, JSON.stringify(catalog, null, 2));

  const withInterp = prompts.filter((p) => p.identifiers.length > 0).length;
  console.log(`extracted ${prompts.length} prompts (${withInterp} with interpolations) -> ${outPath}`);
}

// Only run the CLI when invoked directly — NOT when imported (e.g. by classify.mjs).
// realpath argv[1] before comparing — import.meta.url is symlink-resolved by
// Node's loader, argv[1] isn't (e.g. macOS's /tmp -> /private/tmp), so a raw
// comparison silently skips main() while still exiting 0 when run through one.
import { pathToFileURL } from 'node:url';
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  main();
}

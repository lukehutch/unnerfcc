#!/usr/bin/env node
// patch-prompts.mjs — splice edited system-prompt .md files into a Claude Code
// JS bundle (one big minified string).
//
// This is unnerfcc's own implementation. It reconstructs each prompt's search
// text from a catalog of `pieces` + `identifiers` + `identifierMap`, locates
// that text in the minified bundle (capturing the per-build minified variable
// name in each identifier slot), remaps the human-readable variable names in the
// edited .md body back to those minified names, escapes the result for whatever
// string delimiter surrounds the match, and splices it in by byte offset.
//
// CLI:
//   node patch-prompts.mjs apply <inJs> <catalog.json> <systemPromptsDir> <outJs>
//
// See the block comments on each function for the exact mechanism.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// Frontmatter (.md) parsing
// ---------------------------------------------------------------------------
// The .md files use HTML-comment delimiters for frontmatter:
//   <!--
//   name: ...
//   ccVersion: 2.1.201
//   variables:
//     - SOME_VAR
//   -->
//   <body with ${HUMAN_NAME} placeholders>
// We only need ccVersion (informational) and the raw body (untrimmed).
export function parseMd(text) {
  const m = text.match(/^<!--\r?\n([\s\S]*?)\r?\n-->\r?\n?/);
  if (!m) return { ccVersion: null, content: text };
  const fm = m[1];
  const cv = fm.match(/^ccVersion:\s*(.+?)\s*$/m);
  const content = text.slice(m[0].length);
  return { ccVersion: cv ? cv[1].trim() : null, content };
}

// ---------------------------------------------------------------------------
// 1. reconstructFromPieces — the human-readable text of a prompt.
// ---------------------------------------------------------------------------
// The `${` and `}` live INSIDE the pieces; only the human NAME goes between two
// consecutive pieces. Kept for reference / sanity-checking; not on the splice
// critical path (we splice the edited .md body, not the reconstruction).
export function reconstructFromPieces(pieces, identifiers, identifierMap) {
  let out = "";
  for (let i = 0; i < pieces.length; i++) {
    out += pieces[i];
    if (i < identifiers.length) {
      const key = String(identifiers[i]);
      out += key in identifierMap ? identifierMap[key] : "UNKNOWN_" + identifiers[i];
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Regex helpers
// ---------------------------------------------------------------------------
const REGEX_META = /[.*+?^${}()|[\]\\]/;
function escapeRegexChar(ch) {
  return REGEX_META.test(ch) ? "\\" + ch : ch;
}

// A hex string with each letter turned into a case-insensitive char class,
// e.g. "003c" -> "003[cC]". The bundler is inconsistent about hex-escape case.
function hexClass(str) {
  return str
    .split("")
    .map((d) => (/[a-fA-F]/.test(d) ? "[" + d.toLowerCase() + d.toUpperCase() + "]" : d))
    .join("");
}

// Non-ASCII char -> alternation matching: the literal char, the \uXXXX source
// escape, and (for <=0xff) the \xXX source escape. Astral chars also get their
// surrogate-pair \u\u form.
function nonAsciiAlt(ch) {
  const cp = ch.codePointAt(0);
  const alts = [escapeRegexChar(ch)]; // literal (non-ascii -> not a metachar)
  if (cp > 0xffff) {
    const v = cp - 0x10000;
    const hi = 0xd800 + (v >> 10);
    const lo = 0xdc00 + (v & 0x3ff);
    alts.push("\\\\u" + hexClass(hi.toString(16).padStart(4, "0")) + "\\\\u" + hexClass(lo.toString(16).padStart(4, "0")));
  } else {
    alts.push("\\\\u" + hexClass(cp.toString(16).padStart(4, "0")));
    if (cp <= 0xff) alts.push("\\\\x" + hexClass(cp.toString(16).padStart(2, "0")));
  }
  return "(?:" + alts.join("|") + ")";
}

// ---------------------------------------------------------------------------
// 2. buildSearchRegex — locate the prompt in the minified bundle and CAPTURE
//    the minified identifier in each slot.
// ---------------------------------------------------------------------------
// The bundle holds minified var names + source-escaped text; the pieces hold
// reconstructed text with the human names removed (they sit between pieces).
// For each piece we translate its literal text into a regex fragment that will
// match the bundle's escaped form, then join consecutive pieces with a capture
// group `([\w$]+)` (the minified identifier).
export function buildSearchRegex(pieces, version, buildTime) {
  let src = "";
  for (let pi = 0; pi < pieces.length; pi++) {
    let p = pieces[pi];
    // Literal version/build-time substitutions first.
    p = p.split("<<CCVERSION>>").join(version).split("<<BUILD_TIME>>").join(buildTime);

    // Replace special spans with opaque \x00-delimited sentinels so later
    // regex-escaping / delimiter handling can't clobber their regex fragments.
    const store = Object.create(null);
    let k = 0;
    const put = (frag) => {
      const t = "\x00" + k++ + "\x00";
      store[t] = frag;
      return t;
    };

    // (a) member-access tail `${OBJ[key]}` where key varies per build: a piece
    //     (i>0) starting `[...]}` — match the bracketed key loosely.
    if (pi > 0) {
      p = p.replace(/^\[[^\]]*\]/, () => put("\\[[\\w$]+\\]"));
    }
    // (b) inline `${...}` interpolations still present (complex expressions):
    //     match one level, no nested braces. EXCEPTION: an interpolation that
    //     is a single quoted string literal, e.g. ${"...text..."}, carries the
    //     prompt's distinguishing text — genericizing it would under-anchor the
    //     regex and let it match the wrong ${...} site. Leave those literal so
    //     the char loop below matches their inner text precisely.
    p = p.replace(/\$\{[^{}]*\}/g, (m) => {
      if (/^\$\{\s*(["'`])(?:\\.|[^\\])*?\1\s*\}$/.test(m)) return m; // keep literal
      return put("\\$\\{[^{}]*\\}");
    });
    // (c) backslashes: cooked one-backslash OR raw two-backslash source.
    p = p.replace(/\\/g, () => put("(?:\\\\|\\\\\\\\)"));

    // Now walk char-by-char, translating literals; sentinels are restored inline.
    let out = "";
    for (let j = 0; j < p.length; j++) {
      const ch = p[j];
      if (ch === "\x00") {
        const end = p.indexOf("\x00", j + 1);
        out += store["\x00" + p.slice(j + 1, end) + "\x00"];
        j = end;
        continue;
      }
      if (ch === "\n") {
        out += "(?:\\n|\\\\n)"; // real newline OR the two-char \n source escape
        continue;
      }
      if (ch === '"') {
        out += '(?:"|\\\\")';
        continue;
      }
      if (ch === "'") {
        out += "(?:'|\\\\')";
        continue;
      }
      if (ch === "`") {
        out += "(?:`|\\\\`)";
        continue;
      }
      if (ch.codePointAt(0) > 0x7f) {
        out += nonAsciiAlt(ch);
        continue;
      }
      out += escapeRegexChar(ch);
    }

    src += out;
    if (pi < pieces.length - 1) src += "([\\w$]+)"; // captured minified identifier
  }
  return new RegExp(src, "sig"); // dotAll + case-insensitive (hex case) + global
}

// ---------------------------------------------------------------------------
// 3. applyIdentifierMapping — put the minified var names back into the edited
//    .md body, replacing the human-readable placeholder names.
// ---------------------------------------------------------------------------
export function applyIdentifierMapping(content, capturedVars, identifiers, identifierMap, version, buildTime) {
  const reverseMap = Object.create(null);
  for (let i = 0; i < capturedVars.length; i++) {
    const key = String(identifiers[i]);
    const humanName = key in identifierMap ? identifierMap[key] : "UNKNOWN_" + identifiers[i];
    reverseMap[humanName] = capturedVars[i];
  }
  // Replace longest names first so a short name can't clobber a longer one that
  // contains it. Use a replacer function so `$$`/`$&` in a minified var name are
  // not interpreted as replacement patterns.
  const names = Object.keys(reverseMap).sort((a, b) => b.length - a.length);
  for (const name of names) {
    const re = new RegExp("\\b" + name.replace(REGEX_META, "\\$&") + "\\b", "g");
    content = content.replace(re, () => reverseMap[name]);
  }
  content = content.split("<<CCVERSION>>").join(version).split("<<BUILD_TIME>>").join(buildTime);
  return content;
}

// ---------------------------------------------------------------------------
// 6. Escape a replacement for the actual surrounding string delimiter.
// ---------------------------------------------------------------------------
// IMPORTANT \u2014 empirically determined from this bundle + catalog (do NOT "fix"
// this to re-escape backslashes). The catalog `pieces` and the edited .md
// bodies are stored in JS-SOURCE form for backslash sequences: a literal
// `${...}` in text appears as `\${...}`, a literal backslash as `\\`, an
// escaped backtick as `` \` ``. Newlines are stored RAW (real \n), and
// non-ASCII is stored RAW (real chars). The bundle stores non-ASCII as \uXXXX
// escapes, and (inside "/' strings) newlines as \n.
//
// So the correct source form is produced by:
//   * both: escape non-ASCII -> \uXXXX; DO NOT touch existing backslashes.
//   * "/' : additionally escape real newlines -> \n (illegal raw in a quoted
//           string). Backticks are legal raw here (not interpolated).
//   * `   : newlines stay raw (legal in a template literal); ${...} and \${
//           are already correct in the source-form body.
// Verified: backtick 574/574 byte-identical; " 572/594, ' 92/100 (the misses
// are prompts whose text legitimately changed between bundle and catalog
// versions, i.e. real patches \u2014 not escaping errors).
//
// Defensive extra: escape an occurrence of the surrounding delimiter only when
// it is currently UNescaped (even number of preceding backslashes). This is a
// no-op on the already-source-form corpus but guards against a hand edit that
// introduces a raw delimiter char.
function escapeNonAscii(s) {
  return s.replace(/[\u0080-\uffff]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
}
function escapeUnescapedDelim(s, delim) {
  let out = "";
  let bs = 0; // run length of immediately-preceding backslashes
  for (const ch of s) {
    if (ch === delim && bs % 2 === 0) out += "\\" + delim;
    else out += ch;
    bs = ch === "\\" ? bs + 1 : 0;
  }
  return out;
}
function escapeForQuote(s, delim) {
  s = escapeUnescapedDelim(s, delim);
  s = s.replace(/\r\n/g, "\\n").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  return escapeNonAscii(s);
}
function escapeForBacktick(s) {
  // Source-form bodies already carry correct backtick escaping: depth-0 literal
  // backticks as `` \` ``, and REAL nested template literals inside ${...}
  // interpolations (e.g. ${e ? `the ${e} tool` : "..."}) with RAW backticks that
  // must stay raw. So do NOT touch backticks here — escaping the nested-template
  // ones would break valid JS. Only non-ASCII needs normalizing to \uXXXX.
  return escapeNonAscii(s);
}

// ---------------------------------------------------------------------------
// Whitespace preservation (step 4)
// ---------------------------------------------------------------------------
function edgeWhitespace(pieces) {
  const leading = (pieces[0].match(/^(\s*)/) || ["", ""])[1];
  const last = pieces[pieces.length - 1];
  const trailing = (last.match(/(\s*)$/) || ["", ""])[1];
  return { leading, trailing };
}

// ---------------------------------------------------------------------------
// Choose the match (step 5): a single match wins; with several, prefer the ONE
// complete standalone string literal (same delimiter immediately before and
// after). If that's still ambiguous (multiple standalone, or several non-
// standalone with no unique standalone), return null → the caller SKIPS rather
// than silently patch the wrong site (the parse-gate can't catch a wrong-but-
// valid splice).
// ---------------------------------------------------------------------------
const DELIMS = new Set(['"', "'", "`"]);
function chooseMatch(bundle, matches) {
  if (matches.length === 1) return matches[0];
  const standalone = matches.filter((m) => {
    const before = bundle[m.index - 1];
    const after = bundle[m.index + m[0].length];
    return before === after && DELIMS.has(before);
  });
  if (standalone.length === 1) return standalone[0];
  return null; // ambiguous
}

// ---------------------------------------------------------------------------
// Patch a single prompt into the bundle. Returns a splice op or a status.
// ---------------------------------------------------------------------------
export function patchPrompt(bundle, prompt, mdBody, version, buildTime) {
  const { pieces, identifiers = [], identifierMap = {} } = prompt;
  const regex = buildSearchRegex(pieces, version, buildTime);

  const matches = [];
  let m;
  regex.lastIndex = 0;
  while ((m = regex.exec(bundle)) !== null) {
    matches.push(m);
    if (m[0].length === 0) regex.lastIndex++; // guard against zero-width loops
  }
  if (matches.length === 0) return { status: "couldNotFind" };

  const match = chooseMatch(bundle, matches);
  if (!match) return { status: "ambiguous", count: matches.length };
  const matchIndex = match.index;
  const matchLen = match[0].length;
  const capturedVars = match.slice(1);

  // SLOT AUDIT (skrabe: fail rather than let a named placeholder land on the
  // wrong slot). The regex emits exactly pieces.length-1 capture groups, one per
  // interpolation slot, and applyIdentifierMapping binds capturedVars[i] to
  // identifiers[i] BY INDEX. So the catalog's `identifiers` must line up 1:1 with
  // the captures; a mismatch (malformed catalog entry) would shift every slot and
  // splice a mis-bound body. Fail closed: skip and report, never guess.
  if (capturedVars.length !== identifiers.length) {
    return { status: "skipped", reason: `slot count mismatch: ${capturedVars.length} captured vs ${identifiers.length} identifiers` };
  }

  // Map human names -> minified vars in the edited body.
  let mapped = applyIdentifierMapping(mdBody, capturedVars, identifiers, identifierMap, version, buildTime);

  // Whitespace preservation: strip body edges, restore the pieces' edges.
  const { leading, trailing } = edgeWhitespace(pieces);
  const trimmed = mapped.trim();
  let replacement = trimmed === "" ? "" : leading + trimmed + trailing;

  // The delimiter that actually surrounds this occurrence in the bundle.
  const delim = bundle[matchIndex - 1];

  // GUARD: an UNMAPPED human-name placeholder surviving *inside a ${...}
  // interpolation* of a backtick string would reference an undefined var and
  // ReferenceError at launch. Only names that were never captured/mapped count
  // (a name mapped to itself, e.g. the global `JSON`, is safe), and only
  // occurrences inside `${...}` matter (backticks interpolate; prose does not).
  if (delim === "`") {
    const mappedHuman = new Set();
    for (let i = 0; i < capturedVars.length; i++) {
      const key = String(identifiers[i]);
      mappedHuman.add(key in identifierMap ? identifierMap[key] : "UNKNOWN_" + identifiers[i]);
    }
    const unmapped = Object.values(identifierMap).filter((n) => !mappedHuman.has(n));
    if (unmapped.length > 0) {
      const interps = replacement.match(/\$\{[^{}]*\}/g) || [];
      const bad = unmapped.filter((n) => {
        const re = new RegExp("\\b" + n.replace(REGEX_META, "\\$&") + "\\b");
        return interps.some((s) => re.test(s));
      });
      if (bad.length > 0) {
        return { status: "skipped", reason: `unmapped identifier(s) [${bad.join(", ")}] in backtick interpolation` };
      }
    }
  }

  // Escape for the surrounding delimiter.
  let escaped;
  if (delim === "`") {
    escaped = escapeForBacktick(replacement);
  } else if (delim === '"' || delim === "'") {
    escaped = escapeForQuote(replacement, delim);
  } else {
    // Match chosen was not a standalone string literal, so we can't identify the
    // enclosing delimiter from the neighbor char. Apply only the universally-safe
    // transforms (non-ASCII -> \uXXXX, newline -> \n both cook identically in any
    // JS string context); do NOT escape a delimiter we can't identify.
    escaped = escapeNonAscii(replacement.replace(/\r\n/g, "\\n").replace(/\n/g, "\\n").replace(/\r/g, "\\r"));
  }

  const existing = bundle.slice(matchIndex, matchIndex + matchLen);
  if (escaped === existing) return { status: "unchanged" };

  return { status: "patched", index: matchIndex, len: matchLen, replacement: escaped };
}

// ---------------------------------------------------------------------------
// apply — CLI entry
// ---------------------------------------------------------------------------
function detectVersion(bundle) {
  const m =
    bundle.match(/\/\/\s*Version:\s*(\d+\.\d+\.\d+)/) ||
    bundle.match(/VERSION:"(\d+\.\d+\.\d+)"/) ||
    bundle.match(/\b(\d+\.\d+\.\d+)\b/);
  return m ? m[1] : "unknown";
}
function detectBuildTime(bundle) {
  const m = bundle.match(/BUILD_TIME:"([^"]+)"/);
  return m ? m[1] : "";
}

async function apply(inJs, catalogPath, promptsDir, outJs) {
  let bundle = readFileSync(inJs, "utf8");
  const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
  const version = detectVersion(bundle);
  const buildTime = detectBuildTime(bundle);

  const counts = { patched: 0, unchanged: 0, couldNotFind: 0, skipped: 0 };
  const ops = [];

  // The catalog can carry several entries for one id (the same prompt across
  // CC versions). Group by id and try each entry's pieces against THIS bundle
  // until one matches, so every id is resolved to at most one splice.
  const byId = new Map();
  for (const prompt of catalog.prompts) {
    if (!byId.has(prompt.id)) byId.set(prompt.id, []);
    byId.get(prompt.id).push(prompt);
  }

  for (const [id, entries] of byId) {
    const mdPath = join(promptsDir, id + ".md");
    if (!existsSync(mdPath)) continue; // only patch prompts we have an edit for
    const { content } = parseMd(readFileSync(mdPath, "utf8"));

    let result = null;
    for (const prompt of entries) {
      let res;
      try {
        res = patchPrompt(bundle, prompt, content, version, buildTime);
      } catch (e) {
        res = { status: "skipped", reason: e.message };
      }
      // A definitive outcome (found a location, or a hard skip) wins; keep
      // trying later entries only while every attempt so far was couldNotFind.
      if (res.status !== "couldNotFind") {
        result = res;
        break;
      }
      result = res; // remember the couldNotFind in case nothing matches
    }

    if (result.status === "patched") {
      ops.push({ id, ...result });
    } else if (result.status === "unchanged") {
      counts.unchanged++;
    } else if (result.status === "couldNotFind") {
      counts.couldNotFind++;
    } else if (result.status === "ambiguous") {
      counts.skipped++;
      console.error(`  [skip] ${id}: ${result.count} matches, none uniquely standalone — refusing to guess`);
    } else if (result.status === "skipped") {
      counts.skipped++;
      console.error(`  [skip] ${id}: ${result.reason}`);
    }
  }

  // Apply splices by offset, last-to-first, so earlier indices stay valid.
  // Guard against two prompts resolving to overlapping bundle regions (a short
  // prompt that is a substring of another); splice the first, skip the rest.
  ops.sort((a, b) => a.index - b.index);
  const accepted = [];
  let prevEnd = -1;
  for (const op of ops) {
    if (op.index < prevEnd) {
      counts.skipped++;
      console.error(`  [skip] ${op.id}: overlaps an already-patched region`);
      continue;
    }
    accepted.push(op);
    prevEnd = op.index + op.len;
  }
  accepted.sort((a, b) => b.index - a.index);
  for (const op of accepted) {
    bundle = bundle.slice(0, op.index) + op.replacement + bundle.slice(op.index + op.len);
    counts.patched++;
  }

  writeFileSync(outJs, bundle);

  console.log(`version=${version} buildTime=${buildTime}`);
  console.log(
    `patched=${counts.patched} unchanged=${counts.unchanged} couldNotFind=${counts.couldNotFind} skipped=${counts.skipped}`
  );
  console.log(`wrote ${outJs} (${Buffer.byteLength(bundle)} bytes)`);

  // Safety gate: a bad escape can splice syntactically-invalid JS that still
  // "looks" patched but bricks the binary at boot. Parse the whole output and
  // fail loudly (non-zero exit) rather than let a broken bundle get repacked.
  const ok = await validateJs(bundle);
  counts.valid = ok;
  return counts;
}

async function validateJs(js) {
  let parse;
  try {
    ({ parse } = await import("@babel/parser"));
  } catch {
    // Fail CLOSED: if we can't run the syntax check, don't certify the output as
    // valid — a bad splice must never reach repack unverified.
    console.error("ERROR: @babel/parser unavailable — cannot validate patched output; refusing to certify");
    return false;
  }
  try {
    parse(js, { sourceType: "unambiguous" });
    console.log("validate: output parses OK");
    return true;
  } catch (e) {
    console.error(`ERROR: patched output is NOT valid JS: ${e.message}`);
    if (typeof e.pos === "number") console.error(`  near: ${JSON.stringify(js.slice(e.pos - 80, e.pos + 20))}`);
    return false;
  }
}

// ---------------------------------------------------------------------------
import { pathToFileURL } from "node:url";
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  // A few very large prompts (e.g. the model-migration guide, ~20KB) compile to
  // a 200KB+ search regex that overflows V8's regex-compiler stack on exec. The
  // fix is a bigger stack, which can only be set at process start — so re-exec
  // ourselves once with --stack-size (4MB, safely under the 8MB OS default).
  if (process.env.UNNERF_BIGSTACK !== "1") {
    const { spawnSync } = await import("node:child_process");
    const r = spawnSync(process.execPath, ["--stack-size=4000", process.argv[1], ...process.argv.slice(2)], {
      stdio: "inherit",
      env: { ...process.env, UNNERF_BIGSTACK: "1" },
    });
    process.exit(r.status ?? 1);
  }
  const argv = process.argv.slice(2);
  if (argv[0] === "apply" && argv.length === 5) {
    apply(argv[1], argv[2], argv[3], argv[4]).then((counts) => {
      if (counts && counts.valid === false) process.exit(2);
    });
  } else {
    console.error("usage: node patch-prompts.mjs apply <inJs> <catalog.json> <systemPromptsDir> <outJs>");
    process.exit(1);
  }
}

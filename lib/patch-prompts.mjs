#!/usr/bin/env node
// patch-prompts.mjs — splice edited system-prompt .md files into a Claude Code
// JS bundle by parsing it with @babel/parser and matching STRING-PRODUCING AST
// nodes on their DECODED content — never with a regex over the raw text.
//
// Why AST, not regex: the bundle may encode the same prompt in any of several
// ways — a single- or double-quoted literal, a backtick template (with or without
// ${…} interpolation), or a `+`-concatenation chain — and the same content can be
// reused at many call sites under different encodings. The AST decodes each node
// to its canonical content (quotes/escapes stripped, per-build identifier names
// excised, concatenation folded), so a prompt is located by WHAT IT SAYS, not how
// it happens to be spelled. Every node whose content matches is patched, so a
// reused prompt is un-nerfed at ALL its call-sites, and duplicates broken up
// differently still resolve to the same content key. The shared node→pieces logic
// lives in extract-prompts.mjs so the extractor and the patcher agree exactly.
//
// CLI:
//   node patch-prompts.mjs apply <inJs> <catalog.json> <systemPromptsDir> <outJs>

import { readFileSync, writeFileSync, existsSync, realpathSync } from "node:fs";
import { join } from "node:path";
import {
  buildStringLiteral,
  buildTemplateLiteral,
  buildConcatRun,
} from "./extract-prompts.mjs";

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
// reconstructFromPieces — the human-readable STOCK text of a prompt.
// ---------------------------------------------------------------------------
// The `${` and `}` live INSIDE the pieces; only the human NAME goes between two
// consecutive pieces. Used to tell whether an edited .md still equals stock (a
// no-op) and, in the severity pass, whether a skip lost a real un-nerf.
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

const REGEX_META = /[.*+?^${}()|[\]\\]/;

// ---------------------------------------------------------------------------
// applyIdentifierMapping — put the per-node minified var names back into the
// edited .md body, replacing the human-readable placeholder names.
// ---------------------------------------------------------------------------
// `capturedVars[i]` is the minified identifier the MATCHED NODE uses in slot i
// (from the node's own AST — so two call-sites of the same template each get
// their own variables). `identifiers[i]` indexes `identifierMap` to the human
// name that stands in that slot in the .md body.
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
// Escape a replacement for the actual surrounding string delimiter.
// ---------------------------------------------------------------------------
// IMPORTANT — empirically determined from this bundle + catalog (do NOT "fix"
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
//
// Defensive extra: escape an occurrence of the surrounding delimiter only when
// it is currently UNescaped (even number of preceding backslashes). This is a
// no-op on the already-source-form corpus but guards against a hand edit that
// introduces a raw delimiter char.
function escapeNonAscii(s) {
  return s.replace(/[-￿]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
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
// Whitespace preservation: strip the edited body's edges, restore the stock
// pieces' leading/trailing whitespace so the surrounding source spacing is kept.
// ---------------------------------------------------------------------------
function edgeWhitespace(pieces) {
  const leading = (pieces[0].match(/^(\s*)/) || ["", ""])[1];
  const last = pieces[pieces.length - 1];
  const trailing = (last.match(/(\s*)$/) || ["", ""])[1];
  return { leading, trailing };
}

// ---------------------------------------------------------------------------
// AST site collection: every string-producing node, keyed by decoded content.
// ---------------------------------------------------------------------------
// A "site" is one spot in the bundle that yields a string: a StringLiteral, a
// TemplateLiteral, or a pure `+`-concatenation of string literals. Its `key` is
// the encoding-normalized content (pieces joined) — so nodes holding the same
// text hash to the same key no matter how they're spelled. `delim` is the quote
// to RE-ENCODE with when patching (concatenations collapse to a double-quoted
// literal). `names` are the node's own per-slot minified identifiers.
const AST_SKIP_KEYS = new Set([
  "type", "start", "end", "loc", "range",
  "leadingComments", "trailingComments", "innerComments", "extra",
]);
function collectSites(ast, code, version) {
  const sites = [];
  const push = (built, node, delim) =>
    sites.push({
      key: built.pieces.join("\u0000"),
      pieces: built.pieces,
      identifiers: built.identifiers,
      identifierMap: built.identifierMap,
      names: built.names || [],
      start: node.start,
      end: node.end,
      delim,
    });
  const visit = (node) => {
    if (!node || typeof node.type !== "string") return;
    if (node.type === "StringLiteral") {
      push(buildStringLiteral(node, version), node, code[node.start]);
      return; // a string has no child literals
    }
    if (node.type === "TemplateLiteral") {
      push(buildTemplateLiteral(node, code, version), node, "`");
      for (const e of node.expressions || []) visit(e); // nested literals in ${…}
      return;
    }
    if (node.type === "BinaryExpression" && node.operator === "+") {
      const built = buildConcatRun(node, version);
      if (built) {
        // A pure-string run re-encodes as ONE double-quoted literal; its leaves are
        // subsumed, so don't recurse them.
        push(built, node, '"');
        return;
      }
      // not foldable (a variable-separated run) — fall through to generic recursion,
      // which keeps the parts separate.
    }
    for (const k in node) {
      if (AST_SKIP_KEYS.has(k)) continue;
      const c = node[k];
      if (Array.isArray(c)) { for (const x of c) visit(x); }
      else if (c && typeof c.type === "string") visit(c);
    }
  };
  visit(ast.program);
  return sites;
}

// ---------------------------------------------------------------------------
// Render the FULL replacement source for one matched site (delimiters included),
// mapping the .md body's human placeholders onto the node's own variables and
// escaping for the node's delimiter. Returns { replacement } | { unchanged } |
// { skip: reason }.
// ---------------------------------------------------------------------------
function renderReplacement(site, existing, mdBody, prompt, version, buildTime) {
  const { pieces, identifiers = [], identifierMap = {} } = prompt;
  const capturedVars = site.names;

  // SLOT AUDIT: the node's interpolation slots must line up 1:1 with the catalog's
  // identifiers, or the human→minified mapping would shift. Fail closed.
  if (capturedVars.length !== identifiers.length) {
    return { skip: `slot count mismatch: ${capturedVars.length} node slots vs ${identifiers.length} identifiers` };
  }

  const mapped = applyIdentifierMapping(mdBody, capturedVars, identifiers, identifierMap, version, buildTime);

  // Whitespace preservation: strip body edges, restore the stock pieces' edges.
  const { leading, trailing } = edgeWhitespace(pieces);
  const trimmed = mapped.trim();
  const inner = trimmed === "" ? "" : leading + trimmed + trailing;

  const delim = site.delim;
  // GUARD: an UNMAPPED human-name placeholder surviving inside a backtick ${...}
  // would reference an undefined var and ReferenceError at launch.
  if (delim === "`") {
    const mappedHuman = new Set();
    for (let i = 0; i < capturedVars.length; i++) {
      const key = String(identifiers[i]);
      mappedHuman.add(key in identifierMap ? identifierMap[key] : "UNKNOWN_" + identifiers[i]);
    }
    const unmapped = Object.values(identifierMap).filter((n) => !mappedHuman.has(n));
    if (unmapped.length > 0) {
      const interps = inner.match(/\$\{[^{}]*\}/g) || [];
      const bad = unmapped.filter((n) => {
        const re = new RegExp("\\b" + n.replace(REGEX_META, "\\$&") + "\\b");
        return interps.some((s) => re.test(s));
      });
      if (bad.length > 0) {
        return { skip: `unmapped identifier(s) [${bad.join(", ")}] in backtick interpolation` };
      }
    }
  }

  const escaped = delim === "`" ? escapeForBacktick(inner) : escapeForQuote(inner, delim);
  const replacement = delim + escaped + delim; // whole node source, delimiters included
  if (replacement === existing) return { unchanged: true };
  return { replacement };
}

// ---------------------------------------------------------------------------
// Distinctive un-nerf marker strings — if the input bundle already contains most
// of these, it was already patched (a re-run), so "stock anchor gone" skips are
// expected rather than lost un-nerfs. Kept in sync with install.sh's sentinel list.
// ---------------------------------------------------------------------------
const UNNERF_SENTINELS = [
  "senior-engineer standard",
  "never trade away rigor, depth, or correctness",
  "Spawn agents whenever parallel investigation",
  "investigate thoroughly, then be direct",
  "thorough, clear, and rich with explanation",
];

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

async function parseBundle(js) {
  const { parse } = await import("@babel/parser");
  return parse(js, { sourceType: "unambiguous", errorRecovery: true });
}

async function apply(inJs, catalogPath, promptsDir, outJs) {
  let bundle = readFileSync(inJs, "utf8");
  // Snapshot whether the INPUT was already un-nerfed BEFORE we mutate `bundle` —
  // checking after would see the un-nerfs we just applied and mislabel a fresh
  // stock run as an already-patched re-run.
  const inputSentinelHits = UNNERF_SENTINELS.filter((s) => bundle.includes(s)).length;
  const alreadyPatchedInput = inputSentinelHits >= 3; // ≥3 of 5 ⇒ already un-nerfed
  const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
  const version = detectVersion(bundle);
  const buildTime = detectBuildTime(bundle);

  const counts = { patched: 0, unchanged: 0, couldNotFind: 0, skipped: 0, lost: 0, dupSites: 0 };

  // Parse ONCE; index every string-producing node by its decoded content key.
  let ast;
  try {
    ast = await parseBundle(bundle);
  } catch (e) {
    console.error(`ERROR: could not parse the input bundle as JS: ${e.message}`);
    writeFileSync(outJs, bundle);
    counts.valid = false;
    return counts;
  }
  const sitesByKey = new Map();
  for (const site of collectSites(ast, bundle, version)) {
    if (!sitesByKey.has(site.key)) sitesByKey.set(site.key, []);
    sitesByKey.get(site.key).push(site);
  }

  const ops = [];
  // Deferred skips (couldNotFind / hard-skip), classified AFTER splicing into
  // BENIGN (edited .md equals stock — a no-op) vs LOST (a real un-nerf that never
  // reached the bundle). A LOST entry is the silent-drop failure mode; it must be
  // loud, never buried among the benign skips.
  const skips = [];

  // The catalog can carry several entries for one id (the same prompt across CC
  // versions). Group by id and use whichever entry's stock pieces key real sites.
  const byId = new Map();
  for (const prompt of catalog.prompts) {
    if (!byId.has(prompt.id)) byId.set(prompt.id, []);
    byId.get(prompt.id).push(prompt);
  }

  for (const [id, entries] of byId) {
    const mdPath = join(promptsDir, id + ".md");
    if (!existsSync(mdPath)) continue; // only patch prompts we have an edit for
    const { content } = parseMd(readFileSync(mdPath, "utf8"));

    // A stock .md (== reconstruction) is a no-op — skip it so the ~1300 prompts
    // we don't un-nerf are provably untouched (identical to leaving them alone).
    const isStock = entries.some(
      (e) => reconstructFromPieces(e.pieces, e.identifiers || [], e.identifierMap || {}).trim() === content.trim()
    );
    if (isStock) { counts.unchanged++; continue; }

    // Locate: the catalog entry whose stock pieces key an actual site set.
    let hit = null;
    for (const e of entries) {
      const arr = sitesByKey.get((e.pieces || []).join("\u0000"));
      if (arr && arr.length) { hit = { entry: e, sites: arr }; break; }
    }
    if (!hit) {
      skips.push({ id, entries, content, kind: "couldNotFind", detail: "no matching site in bundle" });
      continue;
    }

    // Render + queue a splice for EVERY matching site (all encodings, all dups).
    let queued = 0;
    let firstSkip = null;
    for (const site of hit.sites) {
      const existing = bundle.slice(site.start, site.end);
      let r;
      try {
        r = renderReplacement(site, existing, content, hit.entry, version, buildTime);
      } catch (e) {
        r = { skip: e.message };
      }
      if (r.skip) { firstSkip = firstSkip || r.skip; continue; }
      if (r.unchanged) continue;
      ops.push({ id, entries, content, start: site.start, end: site.end, replacement: r.replacement });
      queued++;
    }
    if (queued === 0) {
      skips.push({
        id, entries, content,
        kind: firstSkip ? "skipped" : "couldNotFind",
        detail: firstSkip || "matched sites but nothing to change",
      });
    }
  }

  // Overlap guard: string nodes can nest (a matched literal inside a matched
  // template); keep the OUTER (earlier start / longer), drop the contained.
  ops.sort((a, b) => a.start - b.start || b.end - a.end);
  const accepted = [];
  let prevEnd = -1;
  for (const op of ops) {
    if (op.start < prevEnd) continue; // contained in / overlaps an accepted op
    accepted.push(op);
    prevEnd = op.end;
  }

  // Any id whose EVERY site was overlap-dropped never reached the bundle — record
  // it so the severity pass flags it LOST (this is the general-purpose-short-into-
  // the-long-prompt drop; it must be loud, not silent).
  const acceptedIds = new Set(accepted.map((o) => o.id));
  const droppedSeen = new Set();
  for (const op of ops) {
    if (acceptedIds.has(op.id) || droppedSeen.has(op.id)) continue;
    droppedSeen.add(op.id);
    skips.push({ id: op.id, entries: op.entries, content: op.content, kind: "overlap", detail: "every matching site resolved into another prompt's region" });
  }

  // dupSites: accepted call-sites beyond the first per id (a reused prompt un-nerfed
  // at every site). This is where "duplicates encoded differently" all land — they
  // share a content key, so every encoding of the same prompt is patched.
  const perId = {};
  for (const o of accepted) perId[o.id] = (perId[o.id] || 0) + 1;
  counts.dupSites = Object.values(perId).reduce((a, n) => a + Math.max(0, n - 1), 0);
  const reused = Object.entries(perId).filter(([, n]) => n > 1);
  if (reused.length) {
    console.error(
      `  [info] patched ${counts.dupSites} additional call-site(s) of ${reused.length} reused prompt(s): ` +
        reused.map(([id, n]) => `${id}×${n}`).join(", ")
    );
  }

  // Splice offset-descending so earlier offsets stay valid.
  accepted.sort((a, b) => b.start - a.start);
  for (const op of accepted) {
    bundle = bundle.slice(0, op.start) + op.replacement + bundle.slice(op.end);
    counts.patched++;
  }

  // Classify every deferred skip by severity (BENIGN vs LOST vs already-patched
  // input). Detecting an already-patched input globally (via un-nerf sentinels,
  // snapshotted from the INPUT) is robust: on stock, 0 sentinels ⇒ a real un-nerf
  // that didn't splice is genuinely LOST; on a patched re-run, the flood of "stock
  // anchor gone" is expected, not a regression.
  const isStockMd = (rec) =>
    rec.entries.some(
      (e) => reconstructFromPieces(e.pieces, e.identifiers || [], e.identifierMap || {}).trim() === rec.content.trim()
    );
  const benign = [];
  const applied = [];
  const lost = [];
  for (const s of skips) {
    if (isStockMd(s)) benign.push(s);
    else if (alreadyPatchedInput) applied.push(s);
    else lost.push(s);
  }
  counts.couldNotFind = skips.filter((s) => s.kind === "couldNotFind").length;
  counts.skipped = skips.length - counts.couldNotFind;
  counts.lost = lost.length;

  if (lost.length) {
    console.error(`\n  ==================== ${lost.length} UN-NERF(S) FAILED TO SPLICE ====================`);
    console.error(`  The edited .md differs from stock but was NOT applied to the bundle — these`);
    console.error(`  un-nerfs are MISSING from the patched binary. Fix the catalog pieces / rule anchor:`);
    for (const s of lost) console.error(`    [LOST] ${s.id}: ${s.kind} — ${s.detail}`);
    console.error(`  ===============================================================================`);
  }
  if (applied.length) {
    console.error(
      `  [info] input bundle is ALREADY un-nerfed (${inputSentinelHits}/${UNNERF_SENTINELS.length} sentinels present):` +
        ` ${applied.length} un-nerf(s) have no stock anchor left to match — expected on a re-run. Reinstall stock` +
        ` CC (npm i -g @anthropic-ai/claude-code@<ver>) before re-patching for a clean apply. Nothing lost.`
    );
  }
  if (benign.length) {
    console.error(
      `  [info] ${benign.length} stock prompt(s) not re-spliced — we don't un-nerf these and they aren't` +
        ` uniquely locatable in the bundle, so leaving the stock text is a correct no-op (harmless).`
    );
  }

  writeFileSync(outJs, bundle);

  console.log(`version=${version} buildTime=${buildTime}`);
  console.log(
    `patched=${counts.patched} unchanged=${counts.unchanged} couldNotFind=${counts.couldNotFind} skipped=${counts.skipped} lost=${counts.lost} dupSites=${counts.dupSites}`
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
// realpath argv[1] before comparing — import.meta.url is symlink-resolved by
// Node's loader, argv[1] isn't (e.g. macOS's /tmp -> /private/tmp), so a raw
// comparison silently skips main() while still exiting 0 when run through one.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href;
if (isMain) {
  // Parsing an 18 MB minified bundle recurses deep; a bigger stack (set only at
  // process start) avoids a stack overflow on the deepest expression chains.
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
      if (counts && counts.lost > 0) process.exit(3); // a real un-nerf never reached the bundle
    });
  } else {
    console.error("usage: node patch-prompts.mjs apply <inJs> <catalog.json> <systemPromptsDir> <outJs>");
    process.exit(1);
  }
}

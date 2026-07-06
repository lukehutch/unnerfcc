#!/usr/bin/env node
// prune-subsumed.mjs — remove store entries that are now SUBSUMED fragments.
//
// After the extractor learned to fold a `+`-run of string parts (any quote style,
// with or without interpolation) into ONE contiguous string, the run's individual
// leaf parts are no longer extracted on their own — they're subsumed. Any store
// classification keyed on a subsumed leaf's content hash is dead weight (it will
// never be looked up again), and a leaf mis-classified as a "prompt" is actively
// misleading (it's only PART of a larger string). This prunes them.
//
// A leaf is "subsumed" iff it sits inside a `+`-run that buildConcatRun folds AND
// its own content hash is present in the store. We compute leaf hashes exactly the
// way the extractor used to (buildStringLiteral / buildTemplateLiteral), so the
// hash matches whatever the leaf was stored under.
//
//   node prune-subsumed.mjs <cli.js> <ccVersion> [--dry-run]
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "../lib/node_modules/@babel/parser/lib/index.js";
import { buildStringLiteral, buildTemplateLiteral, extract } from "../lib/extract-prompts.mjs";

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const STORE_PATH = join(REPO, "data", "string-catalog.json");
const [cliJs, ccVersion] = process.argv.slice(2);
const DRY = process.argv.includes("--dry-run");
if (!cliJs || !ccVersion) { console.error("usage: node prune-subsumed.mjs <cli.js> <ccVersion> [--dry-run]"); process.exit(2); }

const code = readFileSync(cliJs, "utf8");
const store = JSON.parse(readFileSync(STORE_PATH, "utf8"));
const hashOf = (pieces) => createHash("sha256").update(pieces.join("")).digest("hex");
const ast = parse(code, { sourceType: "unambiguous", errorRecovery: true });

// The set of strings the CURRENT extractor actually emits. A leaf whose content is
// ALSO in this set is not subsumed — it appears independently elsewhere and must
// keep its classification. Only a leaf that is ONLY part of a run (not extracted
// standalone) is subsumed.
const extractedHashes = new Set();
for (const p of extract(code, ccVersion, { includeAll: true })) extractedHashes.add(hashOf(p.pieces));

// A run folds (its leaves get subsumed) only when it is PURE string — every leaf a
// StringLiteral or a backtick with no ${…} — matching lib/extract-prompts.mjs. A
// run with any variable/interpolation operand is NOT folded; its parts stay live.
const SKIP = new Set(["type", "start", "end", "loc", "range", "leadingComments", "trailingComments", "innerComments", "extra"]);
const pureStringy = (n) =>
  n.type === "StringLiteral" ||
  (n.type === "TemplateLiteral" && (n.expressions || []).length === 0) ||
  (n.type === "BinaryExpression" && n.operator === "+" && pureStringy(n.left) && pureStringy(n.right));
const leaves = (n, acc) => {
  if (n.type === "BinaryExpression" && n.operator === "+") { leaves(n.left, acc); leaves(n.right, acc); }
  else acc.push(n);
  return acc;
};

const subsumed = new Set();
const visit = (n, parent) => {
  if (!n || typeof n.type !== "string") return;
  const topFold = n.type === "BinaryExpression" && n.operator === "+" && pureStringy(n) &&
    !(parent && parent.type === "BinaryExpression" && parent.operator === "+");
  if (topFold) {
    for (const leaf of leaves(n, [])) {
      const b = leaf.type === "StringLiteral" ? buildStringLiteral(leaf, ccVersion) : buildTemplateLiteral(leaf, code, ccVersion);
      const h = hashOf(b.pieces);
      // subsumed only if the leaf is in the store AND not independently extracted
      if (store.strings[h] && !extractedHashes.has(h)) subsumed.add(h);
    }
    return; // a pure-string fold has no interpolation expressions to recurse
  }
  for (const k in n) {
    if (SKIP.has(k)) continue;
    const c = n[k];
    if (Array.isArray(c)) { for (const x of c) visit(x, n); }
    else if (c && typeof c.type === "string") visit(c, n);
  }
};
visit(ast.program, null);

const byClass = {};
for (const h of subsumed) { const c = store.strings[h].class; byClass[c] = (byClass[c] || 0) + 1; }
console.error(`subsumed store entries: ${subsumed.size} ${JSON.stringify(byClass)}`);

if (DRY) { console.log(JSON.stringify({ subsumed: subsumed.size, byClass })); process.exit(0); }

for (const h of subsumed) delete store.strings[h];
store.strings = Object.fromEntries(Object.entries(store.strings).sort());
const asciiSafe = (obj) =>
  JSON.stringify(obj, null, 1).replace(new RegExp("[\\u0080-\\uffff]", "g"), (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
writeFileSync(STORE_PATH, asciiSafe(store) + "\n");
console.error(`pruned ${subsumed.size} subsumed entries → ${STORE_PATH} (${Object.keys(store.strings).length} remain)`);

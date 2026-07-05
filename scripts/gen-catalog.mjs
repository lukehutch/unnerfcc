#!/usr/bin/env node
/**
 * gen-catalog.mjs — build a prompt catalog for a new CC version from an
 *                   extracted JS bundle, using OUR OWN extractor (lib/) and a
 *                   SEED-DRIVEN merge. Replaces downloading skrabe's catalog.
 *
 * WHY SEED-DRIVEN
 * ---------------
 * Our minimal extractor (lib/extract-prompts.mjs) favors recall: it emits every
 * prompt-like literal (~9k), including error/log/library strings. Rather than
 * chase precision (tweakcc uses an LLM cache for that), we anchor the catalog to
 * the PREVIOUS one: for each seed prompt we find its CURRENT form in the fresh
 * extraction and carry its id/name/description forward. This keeps the committed
 * catalog clean, stable-sized, and id-stable (our apply-unnerfs rules are keyed
 * by id), while the extractor's over-inclusion never reaches the catalog.
 *
 * Per seed prompt, matched against the fresh extraction:
 *   - identity-hash match  → CARRIED: unchanged; keep the seed entry verbatim.
 *   - fuzzy (100-char) match → CHANGED: Anthropic reworded it; replace
 *     pieces/identifiers/identifierMap with the fresh form (so patching uses
 *     current text), keep id/name, bump version. (An un-nerf rule targeting it
 *     may now need review — apply-unnerfs --check will say so.)
 *   - no match             → REMOVED: dropped from the catalog (reported).
 * Fresh-extraction prompts that match NO seed prompt are genuinely NEW; they are
 * NOT auto-added (that would readmit the junk). They are counted and written to
 * `<out>.candidates.json` (filtered to prompt-shaped) for the maintainer to
 * review and, if worth un-nerfing, promote into the catalog.
 *
 * USAGE
 *   node gen-catalog.mjs <cliJsPath> <version> <outCatalog.json> <seedCatalog.json>
 */

import { readFileSync, writeFileSync, mkdtempSync, copyFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { identityHash, reconstruct } from "./prompt-index.mjs";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO = join(SCRIPT_DIR, "..");
const EXTRACTOR = join(REPO, "lib", "extract-prompts.mjs");

const FUZZY_PREFIX = 100, FUZZY_MIN = 60;
const fpNormalize = (s) => s.replace(/\\(['"`\\])/g, "$1");
const fuzzyKey = (p) => fpNormalize((p.pieces ?? []).join("")).slice(0, FUZZY_PREFIX);

function die(m, c = 1) { console.error(`gen-catalog: ${m}`); process.exit(c); }

const [cliJs, version, outCatalog, seedCatalog] = process.argv.slice(2);
if (!cliJs || !version || !outCatalog || !seedCatalog) {
  die("usage: node gen-catalog.mjs <cliJsPath> <version> <outCatalog.json> <seedCatalog.json>", 2);
}
if (!existsSync(cliJs)) die(`cli.js not found: ${cliJs}`);
if (!existsSync(EXTRACTOR)) die(`extractor not found: ${EXTRACTOR}`);
if (!existsSync(seedCatalog)) die(`seed catalog not found: ${seedCatalog} (needed for id carry-forward)`);

// 1. Extract the fresh (over-inclusive) catalog into a temp file.
const work = mkdtempSync(join(tmpdir(), `unnerfcc-gen-${version}-`));
let fresh;
try {
  const workCli = join(work, "cli.js");
  copyFileSync(cliJs, workCli);
  writeFileSync(join(work, "package.json"), JSON.stringify({ version }));
  const freshPath = join(work, "fresh.json");
  const r = spawnSync("node", [EXTRACTOR, workCli, freshPath], {
    stdio: ["ignore", "inherit", "inherit"], maxBuffer: 512 * 1024 * 1024,
  });
  if (r.status !== 0) die(`extractor exited ${r.status}`, r.status || 1);
  fresh = JSON.parse(readFileSync(freshPath, "utf-8"));
} finally {
  rmSync(work, { recursive: true, force: true });
}

// 2. Index the fresh extraction by identity hash and fuzzy prefix.
const seed = JSON.parse(readFileSync(seedCatalog, "utf-8"));
const freshByIdentity = new Map();
const freshFuzzyCounts = new Map(), freshFuzzy = new Map();
const freshUsed = new Set();
for (const p of fresh.prompts) {
  freshByIdentity.set(identityHash(p), p);
  const k = fuzzyKey(p);
  if (k.length >= FUZZY_MIN) { freshFuzzyCounts.set(k, (freshFuzzyCounts.get(k) || 0) + 1); freshFuzzy.set(k, p); }
}
for (const [k, n] of freshFuzzyCounts) if (n > 1) freshFuzzy.delete(k);

// 3. Seed-driven merge.
const out = { version, prompts: [] };
let carried = 0, changed = 0, removed = [];
for (const s of seed.prompts) {
  const ih = identityHash(s);
  const exact = freshByIdentity.get(ih);
  if (exact) { out.prompts.push({ ...s }); freshUsed.add(ih); carried++; continue; }
  const fk = fuzzyKey(s);
  const fz = fk.length >= FUZZY_MIN ? freshFuzzy.get(fk) : undefined;
  if (fz) {
    // reworded: take the fresh pieces (current text, for patching), keep the
    // identity. The interpolation slots usually don't change when prose is
    // reworded, so CARRY the seed's identifierMap (its names) whenever the
    // identifier structure is unchanged — only a structural change forces the
    // fresh (empty-named) map, which relabel will then fill.
    const sameStructure = JSON.stringify(fz.identifiers) === JSON.stringify(s.identifiers);
    out.prompts.push({
      name: s.name, id: s.id, description: s.description,
      pieces: fz.pieces, identifiers: fz.identifiers,
      identifierMap: sameStructure ? s.identifierMap : fz.identifierMap,
      version,
    });
    freshUsed.add(identityHash(fz)); changed++; continue;
  }
  removed.push(s.id);
}

// 4. Genuinely-new candidates: fresh prompts matched to no seed, filtered to
//    prompt-shaped (markdown header OR long instructional prose), so the
//    maintainer sees real additions, not the 7k of error/library strings.
const isPromptShaped = (p) => {
  const t = reconstruct(p);
  if (/^\s*#{1,3}\s+\S/.test(t)) return true;                 // markdown heading
  if (t.length >= 200 && /\b(you|your|the user|must|should|do not|avoid|when)\b/i.test(t)
      && !/^(Error|Failed|Cannot|Could not|Invalid|Warning|\[|\{)/.test(t.trim())) return true;
  return false;
};
const candidates = fresh.prompts.filter((p) => !freshUsed.has(identityHash(p)) && isPromptShaped(p));

writeFileSync(outCatalog, JSON.stringify(out, null, 2));
if (candidates.length) writeFileSync(outCatalog.replace(/\.json$/, ".candidates.json"), JSON.stringify({ version, prompts: candidates }, null, 2));

console.error(
  `catalog: carried ${carried}, changed ${changed}, removed ${removed.length} → ${out.prompts.length} prompts`
);
if (removed.length) console.error(`  removed ids (verify upstream deleted them): ${removed.slice(0, 12).join(", ")}${removed.length > 12 ? " …" : ""}`);
console.error(`  new candidates for review: ${candidates.length}${candidates.length ? ` → ${outCatalog.replace(/\.json$/, ".candidates.json")}` : ""}`);
console.log(outCatalog);

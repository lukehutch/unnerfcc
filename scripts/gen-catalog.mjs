#!/usr/bin/env node
/**
 * gen-catalog.mjs — build a prompt catalog for a new CC version from an
 *                   extracted JS bundle, using OUR OWN extractor (lib/) and a
 *                   SEED-DRIVEN merge. Replaces downloading skrabe's catalog.
 *
 * WHY SEED-DRIVEN
 * ---------------
 * Our minimal extractor (lib/extract-prompts.mjs), run in `--all` mode, favors
 * recall: it emits every non-blob literal (incl. error/log/library strings and
 * short structural ones). Rather than chase precision (tweakcc uses an LLM cache
 * for that), we anchor the catalog to
 * the PREVIOUS one: for each seed prompt we find its CURRENT form in the fresh
 * extraction and carry its id/name/description forward. This keeps the committed
 * catalog clean, stable-sized, and id-stable (our apply-unnerfs rules are keyed
 * by id), while the extractor's over-inclusion never reaches the catalog.
 *
 * Per seed prompt, matched against the fresh extraction:
 *   - identity-hash match  → CARRIED: unchanged; keep the seed entry verbatim.
 *   - no match             → REMOVED: dropped from the catalog (reported).
 *
 * That is the whole matching rule. The fresh extraction is a full-AST parse of
 * the entire bundle, so "not in the fresh set" means "not in the source" — there
 * is no grep-the-bundle fallback and no fuzzy tier.
 *
 * PURE HASHING — there is no fuzzy/prefix matching. If Anthropic rewords a
 * prompt by even one character its identityHash misses, the seed entry is
 * REMOVED, and the new wording arrives as a fresh string that gets classified
 * and relabeled (relabel is handed the removed-id list so it can re-use the id,
 * which is what keeps `<id>.md` and the un-nerf rules stable across a reword).
 *
 * Fresh-extraction prompts matching no seed are genuinely NEW. Two outcomes:
 *   - ADMITTED: Claude's classification store says class=="prompt" AND it was
 *     first seen in THIS version — a real new prompt, added anonymously for
 *     relabel to name. This is the readmission path for a reworded prompt.
 *   - CANDIDATE: everything else prompt-shaped, written to
 *     `<out>.candidates.json` for the maintainer to review.
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
  // `--all`: emit EVERY non-blob literal (not just the >=24-char prose set), so
  // short/structural seed prompts ("[Thinking removed]", "<bash-input>${}…",
  // "No files found") are present in the fresh set and CARRY by exact identity
  // hash. Without this they miss extraction AND the bundle-text safety net
  // (short / em-dash-broken runs), and get spuriously reported REMOVED — which
  // trips validate-catalog's ">50 removed" gate on an ordinary version bump.
  const r = spawnSync("node", [EXTRACTOR, workCli, freshPath, "--all"], {
    stdio: ["ignore", "inherit", "inherit"], maxBuffer: 512 * 1024 * 1024,
  });
  if (r.status !== 0) die(`extractor exited ${r.status}`, r.status || 1);
  fresh = JSON.parse(readFileSync(freshPath, "utf-8"));
} finally {
  rmSync(work, { recursive: true, force: true });
}

// 2. Index the fresh extraction by identity hash.
const seed = JSON.parse(readFileSync(seedCatalog, "utf-8"));

// Claude's classification store — the authoritative "is this a prompt?" signal.
// Loaded here (before the merge) because step 3b needs it to decide which fresh
// strings to admit, not just which to list as candidates.
let classified = {};
try { classified = JSON.parse(readFileSync(join(REPO, "data", "string-catalog.json"), "utf8")).strings || {}; } catch {}

// There is NO bundle-text safety net. The extractor parses the ENTIRE bundle
// into an AST and `--all` mode emits every non-blob literal it contains — one
// site per live string node — so any string that exists in the source is in the
// fresh set by construction. A grep of the raw source could only tell us
// something the AST already knows.
//
// The net that used to live here was also actively harmful: it matched the
// longest >=25-char printable-ASCII run, which in a multi-KB document is a
// generic sentence that survives an edit elsewhere in the file. Measured at
// 2.1.218 -> 2.1.219, 15 of its 32 "rescues" were prompts whose text was GONE
// from the bundle; carrying them would have written stale 2.1.218 wording into
// the 2.1.219 catalog under a live id. A drop is recoverable (the reworded text
// is re-admitted at 3b and relabel re-attaches the id); a stale carry is not.
const freshByIdentity = new Map();
const freshUsed = new Set();
for (const p of fresh.prompts) freshByIdentity.set(identityHash(p), p);

// 3. Seed-driven merge — exact identity hash, or nothing.
const out = { version, prompts: [] };
let carried = 0, removed = [];
for (const s of seed.prompts) {
  const ih = identityHash(s);
  if (freshByIdentity.has(ih)) { out.prompts.push({ ...s }); freshUsed.add(ih); carried++; continue; }
  removed.push(s.id);
}

// 3b. Admit genuinely-new prompts. Under pure hashing a reworded prompt is a
// MISS above and its fresh form lands here, so this is not optional garnish —
// it is the only way a reworded prompt gets back into the catalog (and hence
// keeps its `<id>.md` alive for apply-unnerfs). Entries are admitted
// anonymously (no id/name) — relabel names them, re-using a removed id when it
// recognizes a reword.
//
// The ONLY gate is identity-hash dedupe. Every candidate reaching this loop is
// a live string node the normalizer emitted, so it is addressable by the
// patcher and deserves its own entry; there is nothing else to filter on.
//
// Two narrower gates lived here and both dropped live prompts:
//
//   - `ccFirstSeen === version`, using "first seen in this release" as a proxy
//     for "not already covered". The proxy is wrong in exactly the case pure
//     hashing makes common: a prompt whose text predates this release but whose
//     catalog entry hash-MISSED is neither carried at 3 nor admitted here, so
//     it vanishes from the catalog while still being live in the bundle —
//     invisible to relabel, apply-unnerfs and patching. Measured at 2.1.219, it
//     dropped 615 live prompts, among them whole system-prompt sections
//     ("# Delivering work", "## Delegating to subagents") and the
//     EndConversation tool description.
//
//   - CONTAINMENT: skip a string that some longer carried/admitted entry quotes
//     verbatim, justified by the claim that `--all` emits a folded run AND each
//     of its leaves. The normalized AST does not do that. A bare-`${}` template
//     folds to ONE site, and a complex interpolation splits into DISJOINT
//     siblings (prefix / arm / arm / suffix) — so nesting between two extracted
//     sites is impossible, and containment can only ever mean "some longer
//     string quotes this prompt". Measured at 2.1.219 it dropped 55 live nodes:
//     54 prompts quoted by documentation blobs (the 174 KB
//     skill-model-migration-guide alone accounted for several, including both
//     ternary arms of "# Communicating with the user"), 1 live sibling prefix,
//     and 0 genuine leaves.
const admitted = [];
const seenAdmit = new Set();
for (const p of fresh.prompts) {
  const ih = identityHash(p);
  if (freshUsed.has(ih) || seenAdmit.has(ih)) continue;
  const rec = classified[ih];
  if (!rec || rec.class !== "prompt") continue;
  seenAdmit.add(ih);
  admitted.push({
    name: "", id: "", description: "",
    pieces: p.pieces, identifiers: p.identifiers, identifierMap: p.identifierMap,
    version,
  });
}
out.prompts.push(...admitted);

// 4. Genuinely-new candidates: fresh prompts matched to no seed, filtered to
//    prompt-shaped (markdown header OR long instructional prose), so the
//    maintainer sees real additions, not the 7k of error/library strings.
// Prefer the Claude CLASSIFICATION store (authoritative — no guessing): a
// non-carried string is a prompt candidate iff Claude classified it "prompt".
// Fall back to a shape heuristic only for strings not yet in the store, so
// gen-catalog still works before the classification bootstrap has run.
const isPromptShaped = (p) => {
  const rec = classified[identityHash(p)];
  if (rec) return rec.class === "prompt";                     // Claude decided
  const t = reconstruct(p);                                   // fallback: unclassified
  if (/^\s*#{1,3}\s+\S/.test(t)) return true;                 // markdown heading
  if (t.length >= 200 && /\b(you|your|the user|must|should|do not|avoid|when)\b/i.test(t)
      && !/^(Error|Failed|Cannot|Could not|Invalid|Warning|\[|\{)/.test(t.trim())) return true;
  return false;
};
// Attach the classifier's PROPOSED name/description/slots to each candidate so
// the maintainer reviews a pre-labeled worklist (skrabe's "proposes names, I
// sign off"), then promotes the confirmed ones into the catalog with real ids.
const candidates = fresh.prompts
  .filter((p) => { const ih = identityHash(p); return !freshUsed.has(ih) && !seenAdmit.has(ih) && isPromptShaped(p); })
  .map((p) => {
    const rec = classified[identityHash(p)] || {};
    return { ...p, proposedName: rec.proposedName || "", proposedDescription: rec.proposedDescription || "", slots: rec.slots || "", unnerf: !!rec.unnerf };
  });

writeFileSync(outCatalog, JSON.stringify(out, null, 2));
if (candidates.length) writeFileSync(outCatalog.replace(/\.json$/, ".candidates.json"), JSON.stringify({ version, prompts: candidates }, null, 2));

console.error(
  `catalog: carried ${carried}, admitted ${admitted.length}, removed ${removed.length} → ${out.prompts.length} prompts`
);
if (removed.length) console.error(`  removed ids (reworded upstream, or deleted): ${removed.slice(0, 12).join(", ")}${removed.length > 12 ? " …" : ""}`);
if (admitted.length) console.error(`  admitted ${admitted.length} anonymous prompt-class string(s) — relabel must name them`);
console.error(`  new candidates for review: ${candidates.length}${candidates.length ? ` → ${outCatalog.replace(/\.json$/, ".candidates.json")}` : ""}`);
console.log(outCatalog);

#!/usr/bin/env node
/**
 * gen-catalog.mjs — build a prompt catalog for a new CC version from an
 *                   extracted JS bundle, using OUR OWN extractor (engine/) and a
 *                   SEED-DRIVEN merge. Replaces downloading skrabe's catalog.
 *
 * WHY SEED-DRIVEN
 * ---------------
 * Our minimal extractor (engine/extract-prompts.mjs), run in `--all` mode, favors
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
 * MULTI-MODULE INPUT (as of v2.1.251): <jsDir> is a directory produced by
 * `engine/bun-binary.mjs unpack` — one file per Bun module (zstd modules
 * already transparently decompressed to plain text) plus a manifest.json.
 * Earlier builds shipped one ~25MB entry module with everything inlined;
 * v2.1.251 split it into ~1800 chunk modules with no single "main" one to
 * special-case (confirmed: the same string can appear in more than one chunk
 * simultaneously). So every module gets its own extract() call, in-process
 * (spawning a subprocess per module, as the old single-file flow did once
 * for the one bundle, would mean ~1800 process spawns) — and many modules
 * are not JS at all (native .node libraries, an .html .asset template),
 * which simply fail to parse and are skipped, exactly the failure mode
 * extract() already needs to survive for one bad file.
 *
 * USAGE
 *   node gen-catalog.mjs <jsDir> <version> <outCatalog.json> <seedCatalog.json>
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { identityHash, reconstruct } from "./prompt-index.mjs";
import { extract, isMarkdownAssetPath, extractMarkdownAsset } from "../engine/extract-prompts.mjs";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");

function die(m, c = 1) { console.error(`gen-catalog: ${m}`); process.exit(c); }

const [jsDir, version, outCatalog, seedCatalog] = process.argv.slice(2);
if (!jsDir || !version || !outCatalog || !seedCatalog) {
  die("usage: node gen-catalog.mjs <jsDir> <version> <outCatalog.json> <seedCatalog.json>", 2);
}
if (!existsSync(jsDir)) die(`module directory not found: ${jsDir}`);
const manifestPath = join(jsDir, "manifest.json");
if (!existsSync(manifestPath)) die(`manifest.json not found in ${jsDir} — was this produced by 'bun-binary.mjs unpack'?`);
if (!existsSync(seedCatalog)) die(`seed catalog not found: ${seedCatalog} (needed for id carry-forward)`);

// 1. Extract the fresh (over-inclusive) catalog by running extract() over
// every module, merging results by identity hash — the SAME dedup key
// extract() already uses within one file, now applied ACROSS files too, so a
// string duplicated across chunks by Bun's own splitter still yields exactly
// one catalog entry (not one per chunk it happens to appear in).
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const seenHash = new Set();
const freshPrompts = [];
let parsedModules = 0, skippedModules = 0, markdownModules = 0;
for (const entry of manifest.modules) {
  const filePath = join(jsDir, entry.relPath);
  let source;
  try { source = readFileSync(filePath, "utf8"); } catch { skippedModules++; continue; }
  let items;
  if (isMarkdownAssetPath(entry.relPath)) {
    // v2.1.251+: a real slice of Claude Code's own prompt/skill/reference
    // content lives in standalone .md/.txt asset modules, not JS string
    // literals — see extract-prompts.mjs's isMarkdownAssetPath/
    // extractMarkdownAsset header comment for the full writeup (confirmed by
    // content: SKILL-*.md are skill bodies, README-*.md are reference docs,
    // loopAutonomousPreamble(Persistent)-*.md are system prompts, etc — and
    // for what's deliberately EXCLUDED: bundled foreign source from an
    // external design system's own build, which looks like a text asset by
    // extension but isn't Claude Code's prompt content at all).
    items = extractMarkdownAsset(source, version);
    markdownModules++;
  } else {
    try {
      // `--all`-equivalent (all: true): emit EVERY non-blob literal (not just
      // the >=24-char prose set), so short/structural seed prompts
      // ("[Thinking removed]", "<bash-input>${}…", "No files found") are
      // present in the fresh set and CARRY by exact identity hash. Without this
      // they miss extraction AND the bundle-text safety net (short /
      // em-dash-broken runs), and get spuriously reported REMOVED — which
      // trips validate-catalog's ">50 removed" gate on an ordinary version bump.
      items = extract(source, version, { all: true });
    } catch {
      // Not JS (native binary, HTML asset, foreign bundled design-system
      // source, etc.) — expected for a meaningful fraction of modules, not an error.
      skippedModules++;
      continue;
    }
    parsedModules++;
  }
  for (const p of items) {
    const ih = identityHash(p);
    if (seenHash.has(ih)) continue;
    seenHash.add(ih);
    freshPrompts.push(p);
  }
}
console.error(`  scanned ${manifest.modules.length} module(s): ${parsedModules} parsed as JS, ${markdownModules} as whole-file markdown/text assets, ${skippedModules} skipped (not JS or a recognized asset) → ${freshPrompts.length} distinct string(s)`);
const fresh = { version, prompts: freshPrompts };

// 2. Index the fresh extraction by identity hash.
const seed = JSON.parse(readFileSync(seedCatalog, "utf-8"));

// Claude's classification store — the authoritative "is this a prompt?" signal.
// Loaded here (before the merge) because step 3b needs it to decide which fresh
// strings to admit, not just which to list as candidates.
//
// The two failure modes below are handled differently on purpose: a MISSING
// store is a legitimate, expected state before the classification bootstrap
// has ever run (gen-catalog still works, just falls back to the shape
// heuristic for every string) and stays a quiet note. Anything else — the
// file exists but fails to read or parse — is surfaced loudly, never silently
// swallowed: an empty `catch {}` here once hid a plain ReferenceError (a
// missing `REPO` definition) for an unknown length of time, silently zeroing
// out EVERY admission and forcing every candidate through the weaker
// heuristic on every run, which is exactly the "admitted 0, N removed"
// pattern that looked like a classification or extraction bug but wasn't.
let classified = {};
const classifyStorePath = join(REPO, "data", "string-catalog.json");
if (existsSync(classifyStorePath)) {
  try {
    classified = JSON.parse(readFileSync(classifyStorePath, "utf8")).strings || {};
  } catch (e) {
    console.error(`gen-catalog: WARNING: ${classifyStorePath} exists but could not be read/parsed (${e.message}) — admission and candidate classification will incorrectly fall back to the shape heuristic for EVERY string this run, not just unclassified ones. Fix this before trusting "admitted"/"removed" counts.`);
  }
} else {
  console.error(`gen-catalog: note: no classification store yet at ${classifyStorePath} — admission/candidates use the shape heuristic only (expected only before the classification bootstrap has ever run)`);
}

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

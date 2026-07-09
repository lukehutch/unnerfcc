#!/usr/bin/env node
/**
 * unnerf-status.mjs — detect UN-NERF STATUS CHANGES on reworded prompts.
 *
 * When Anthropic rewords a prompt, its stock text drifts but the pipeline keeps
 * its stable catalog `id` (gen-catalog carries the id across the reword). So the
 * authoritative way to ask "did this prompt's un-nerf status change?" is to pair
 * the PREVIOUS and NEW prompt catalogs on `id`, and for each id present in both:
 *   - if the prompt TEXT changed (identityHash differs) — i.e. it's a "changed
 *     string" — AND
 *   - its `unnerf` flag (from the Claude classification store, keyed by
 *     identityHash) FLIPPED,
 * then upstream added or removed a brevity/effort nerf, and the apply-unnerfs
 * rule for that prompt must be re-checked.
 *
 * Id-pairing beats a prefix/fuzzy text match here: a reword that touches the
 * OPENING words (exactly where nerf phrasing like "concise" -> "thorough" tends
 * to live) would defeat a prefix match, but the id carries regardless of where
 * the edit lands.
 *
 * Pure detection (detectUnnerfStatusChanges) + a thin CLI:
 *   node unnerf-status.mjs changes <prevCatalog.json> <newCatalog.json> \
 *        [<string-catalog.json>] [--out <file>]
 * Exit 0 always (advisory); writes data/unnerf-status-changes.json.
 */

import { readFileSync, writeFileSync, realpathSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { identityHash, reconstruct } from "./prompt-index.mjs";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_STORE = join(REPO, "data", "string-catalog.json");
const DEFAULT_OUT = join(REPO, "data", "unnerf-status-changes.json");

// Index a catalog by id (first entry wins; same-id multi-site dups share content
// so their identityHash is equal anyway).
function byId(catalog) {
  const m = new Map();
  for (const p of catalog.prompts ?? []) if (p.id && !m.has(p.id)) m.set(p.id, p);
  return m;
}

// The store's `unnerf` flag is only meaningful for prompt-class strings.
const recUnnerf = (rec) => (rec && rec.class === "prompt" ? !!rec.unnerf : rec ? false : null);

/**
 * @param prevCatalog  previous prompt catalog { prompts: [{ id, pieces, ... }] }
 * @param newCatalog   new prompt catalog (same shape)
 * @param storeStrings the classification store `.strings` map: hash -> record
 *                     (record has { class, unnerf, ... }); default {} if absent.
 * @returns { changes, unverifiable } — `changes` = reworded prompts whose
 *   un-nerf status flipped; `unverifiable` = reworded prompts whose old or new
 *   form isn't in the classification store (can't be judged).
 */
export function detectUnnerfStatusChanges(prevCatalog, newCatalog, storeStrings = {}) {
  const prev = byId(prevCatalog);
  const next = byId(newCatalog);
  const changes = [];
  const unverifiable = [];
  for (const [id, newE] of next) {
    const oldE = prev.get(id);
    if (!oldE) continue; // genuinely new id — not a "changed string"
    const oldH = identityHash(oldE);
    const newH = identityHash(newE);
    if (oldH === newH) continue; // text unchanged — not a "changed string"
    const oldRec = storeStrings[oldH];
    const newRec = storeStrings[newH];
    if (oldRec == null || newRec == null) {
      unverifiable.push({
        id,
        name: newE.name || oldE.name || "",
        reason: newRec == null ? "new form not classified" : "old form not classified",
        sample: reconstruct(newE).slice(0, 200),
      });
      continue;
    }
    const was = recUnnerf(oldRec);
    const now = recUnnerf(newRec);
    if (was === now) continue; // reworded but un-nerf status unchanged
    changes.push({
      id,
      name: newE.name || oldE.name || "",
      was,
      now,
      direction: now ? "ADDED nerf" : "REMOVED nerf",
      oldHash: oldH.slice(0, 12),
      newHash: newH.slice(0, 12),
      sample: reconstruct(newE).slice(0, 200),
    });
  }
  // Added-nerf first (a new cap to lift — more urgent), then by id.
  changes.sort((a, b) => (a.now === b.now ? a.id.localeCompare(b.id) : a.now ? -1 : 1));
  unverifiable.sort((a, b) => a.id.localeCompare(b.id));
  return { changes, unverifiable };
}

// --- CLI -------------------------------------------------------------------
function main(argv) {
  const [cmd, prevPath, newPath] = argv;
  if (cmd !== "changes" || !prevPath || !newPath) {
    console.error("usage: node unnerf-status.mjs changes <prevCatalog.json> <newCatalog.json> [<string-catalog.json>] [--out <file>]");
    return 2;
  }
  const outI = argv.indexOf("--out");
  const outPath = outI >= 0 ? argv[outI + 1] : DEFAULT_OUT;
  const posStore = argv[3] && !argv[3].startsWith("--") ? argv[3] : DEFAULT_STORE;
  const prev = JSON.parse(readFileSync(prevPath, "utf8"));
  const next = JSON.parse(readFileSync(newPath, "utf8"));
  let strings = {};
  try { strings = JSON.parse(readFileSync(posStore, "utf8")).strings || {}; }
  catch { console.error(`  (no classification store at ${posStore} — un-nerf status unverifiable)`); }

  const { changes, unverifiable } = detectUnnerfStatusChanges(prev, next, strings);
  writeFileSync(outPath, JSON.stringify({ from: prev.version, to: next.version, changes, unverifiable }, null, 1) + "\n");

  if (changes.length) {
    console.error(`⚠ ${changes.length} reworded prompt(s) CHANGED un-nerf status — RE-CHECK apply-unnerfs rules:`);
    for (const c of changes) console.error(`   ${c.direction}: ${c.id} — ${JSON.stringify(c.sample.slice(0, 70))}`);
  } else {
    console.error(`no un-nerf status changes on reworded prompts`);
  }
  if (unverifiable.length) {
    console.error(`   ${unverifiable.length} reworded prompt(s) UNVERIFIABLE (not in classification store) — see report`);
  }
  console.error(`report → ${outPath}`);
  console.log(outPath);
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  process.exit(main(process.argv.slice(2)));
}

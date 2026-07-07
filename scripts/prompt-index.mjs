#!/usr/bin/env node
/**
 * prompt-index.mjs — SHA-256 fingerprinting + cross-version diff for the prompt
 *                    catalog. The successor to the MD5 `system-prompt-checksums`
 *                    logic, extended to drive automated relabeling.
 *
 * WHY TWO HASHES PER PROMPT
 * -------------------------
 * A catalog entry is `{ id, name, description, pieces[], identifiers[],
 * identifierMap{}, version }`. We fingerprint each entry two ways:
 *
 *   identityHash = sha256(pieces.join(''))
 *       Label-INDEPENDENT: the literal template text with every `${...}` slot
 *       blanked (pieces already exclude the interpolated variable names). Two
 *       builds of the same prompt hash equal here regardless of how the slots
 *       are named, so this is the stable key for carrying a prompt's identity
 *       (id/name/description/identifierMap) forward across CC versions.
 *
 *   driftHash = sha256(reconstruct(entry))
 *       The reconstructed body WITH `${HUMAN_NAME}` placeholders — i.e. exactly
 *       the text that lands in the `.md`. This is the change-detection signal:
 *       if a prompt's driftHash changed, its stock text moved and any un-nerf
 *       rule targeting it must be re-reviewed (this is what the old MD5
 *       `system-prompt-checksums.json` did, now SHA-256 and catalog-derived).
 *
 * DIFF SEMANTICS (diffCatalogs)
 * -----------------------------
 * Given a previous (labeled) catalog and a freshly-extracted catalog:
 *   carried  — identityHash matches a prev entry: identity is known, copy it.
 *   changed  — no identity match, but a fuzzy 100-char-prefix match to a prev
 *              entry (a reword): identity SHOULD be preserved (same id), but the
 *              text moved. Relabel confirms + carries the id.
 *   added    — no identity or fuzzy match: genuinely new, needs a fresh label.
 *   removed  — a prev entry with no identity match in the new catalog.
 * `changed` + `added` (and any `carried` entry that is still anonymous, e.g. the
 * extractor's seed couldn't name it) form the relabeling worklist.
 *
 * This module is pure (no I/O beyond reading JSON when run as a CLI) so it is
 * unit-testable against two committed catalogs.
 */

import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const HASH_ALGO = "sha256";
export const sha256 = (text) =>
  createHash(HASH_ALGO).update(text, "utf-8").digest("hex");

// Fuzzy-match tuning — mirrors the extractor's mergeWithExisting so our diff
// agrees with how the catalog itself carries identity across a reword.
const FUZZY_PREFIX = 100;
const FUZZY_MIN = 60;

/**
 * Reconstruct a prompt body from pieces + identifiers + identifierMap, inserting
 * `HUMAN_NAME` between pieces (the `${` / `}` already live inside the pieces).
 * Byte-identical to sync-version.mjs / tweakcc's reconstructContentFromPieces.
 */
export function reconstruct(prompt) {
  const { pieces, identifiers, identifierMap } = prompt;
  let out = "";
  for (let i = 0; i < pieces.length; i++) {
    out += pieces[i];
    if (i < identifiers.length) {
      const label = identifiers[i];
      out += identifierMap[String(label)] ?? `UNKNOWN_${label}`;
    }
  }
  return out;
}

export const identityHash = (p) => sha256((p.pieces ?? []).join(""));
export const driftHash = (p) => sha256(reconstruct(p));

/**
 * Normalize source-form escapes so a prefix compares equal across extraction
 * pipelines (mirrors the extractor's fpNormalize). Used only for fuzzy keys.
 */
const fpNormalize = (s) => s.replace(/\\(['"`\\])/g, "$1");
const fuzzyKey = (p) => fpNormalize((p.pieces ?? []).join("")).slice(0, FUZZY_PREFIX);

const isAnonymous = (p) => !p.id || !p.name;

/**
 * Build a lookup index over a catalog's prompts:
 *   byIdentity  Map identityHash -> entry
 *   byId        Map id -> entry
 *   fuzzy       Map fuzzyKey -> entry  (collisions dropped, like the extractor)
 */
export function buildIndex(catalog) {
  const prompts = catalog.prompts ?? [];
  const byIdentity = new Map();
  const byId = new Map();
  const fuzzyCounts = new Map();
  const fuzzy = new Map();
  for (const p of prompts) {
    byIdentity.set(identityHash(p), p);
    if (p.id) byId.set(p.id, p);
    const k = fuzzyKey(p);
    if (k.length >= FUZZY_MIN) {
      fuzzyCounts.set(k, (fuzzyCounts.get(k) || 0) + 1);
      fuzzy.set(k, p);
    }
  }
  for (const [k, n] of fuzzyCounts) if (n > 1) fuzzy.delete(k); // ambiguous → drop
  return { byIdentity, byId, fuzzy, prompts };
}

/**
 * Diff a freshly-extracted catalog against the previous labeled one.
 * Returns { carried, changed, added, removed, worklist } where each item is
 * { entry, prev? , reason }.
 */
export function diffCatalogs(prevCatalog, nextCatalog) {
  const prev = buildIndex(prevCatalog);
  const next = buildIndex(nextCatalog);

  const carried = [];
  const changed = [];
  const added = [];
  const seenPrevIdentity = new Set();

  for (const entry of next.prompts) {
    const ih = identityHash(entry);
    const exact = prev.byIdentity.get(ih);
    if (exact) {
      seenPrevIdentity.add(identityHash(exact));
      carried.push({ entry, prev: exact, reason: "identity-match" });
      continue;
    }
    const fk = fuzzyKey(entry);
    const fz = fk.length >= FUZZY_MIN ? prev.fuzzy.get(fk) : undefined;
    if (fz) {
      seenPrevIdentity.add(identityHash(fz));
      changed.push({ entry, prev: fz, reason: "fuzzy-reword" });
    } else {
      added.push({ entry, prev: null, reason: "new" });
    }
  }

  const removed = prev.prompts.filter(
    (p) => !seenPrevIdentity.has(identityHash(p))
  );

  // The relabeling worklist: everything whose identity is uncertain OR still
  // anonymous even after an identity carry (a seed that couldn't name it).
  const worklist = [
    ...changed.map((x) => ({ ...x, kind: "changed" })),
    ...added.map((x) => ({ ...x, kind: "added" })),
    ...carried
      .filter((x) => isAnonymous(x.entry) && isAnonymous(x.prev))
      .map((x) => ({ ...x, kind: "anonymous" })),
  ];

  return { carried, changed, added, removed, worklist };
}

/** Structural fingerprint manifest for change-detection / drift review. */
export function buildManifest(catalog) {
  const prompts = catalog.prompts ?? [];
  const byId = {};
  for (const p of prompts) {
    if (!p.id) continue;
    byId[`${p.id}.md`] = { identity: identityHash(p), drift: driftHash(p), version: p.version };
  }
  return {
    kind: "prompt-index-sha256",
    ccVersion: catalog.version,
    count: Object.keys(byId).length,
    prompts: Object.fromEntries(Object.entries(byId).sort()),
  };
}

// ---------------------------------------------------------------------------
// CLI: `node prompt-index.mjs diff <prev.json> <next.json>` — human summary.
// ---------------------------------------------------------------------------
function main(argv) {
  const [cmd, a, b] = argv;
  if (cmd === "diff" && a && b) {
    const prev = JSON.parse(readFileSync(a, "utf-8"));
    const next = JSON.parse(readFileSync(b, "utf-8"));
    const d = diffCatalogs(prev, next);
    console.log(
      `carried ${d.carried.length}  changed ${d.changed.length}  added ${d.added.length}  removed ${d.removed.length}`
    );
    console.log(`relabel worklist: ${d.worklist.length}`);
    for (const w of d.worklist) {
      const head = reconstruct(w.entry).slice(0, 70).replace(/\n/g, "\\n");
      console.log(
        `  [${w.kind}]${w.prev ? ` (was ${w.prev.id})` : ""} ${w.entry.id || "<anon>"} :: ${head}`
      );
    }
    return 0;
  }
  console.error("usage: node prompt-index.mjs diff <prev-catalog.json> <next-catalog.json>");
  return 2;
}

// realpath argv[1] before comparing — import.meta.url is symlink-resolved by
// Node's loader, argv[1] isn't (e.g. macOS's /tmp -> /private/tmp), so a raw
// comparison silently skips main() while still exiting 0 when run through one.
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  process.exit(main(process.argv.slice(2)));
}

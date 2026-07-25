#!/usr/bin/env node
/**
 * prompt-index.mjs — SHA-256 fingerprinting + cross-version diff for the prompt
 *                    catalog. The successor to the MD5 `system-prompt-checksums`
 *                    logic, extended to drive automated relabeling.
 *
 * WHY TWO HASHES PER PROMPT
 * -------------------------
 * A catalog entry is `{ id, name, description, pieces[], identifiers[],
 * identifierMap{}, version }`, where `pieces` are the literal runs the node
 * produces — already decoded to their exact runtime value by the extractor —
 * separated by the runtime interpolations (SLOTS), and `identifiers[i]` is the
 * slot's FIRST-OCCURRENCE index. `pieces.length === identifiers.length + 1`
 * always. We fingerprint each entry two ways:
 *
 *   identityHash = sha256(canonicalize(pieces, identifiers))
 *       Label-INDEPENDENT: the literal text plus the slot POSITIONS, rendered as
 *       bare `${}`. No variable name and no slot index reaches this hash, so
 *       neither a minifier renaming a variable nor one reusing a single variable
 *       across two slots can churn the catalog. This is the stable key for
 *       carrying a prompt's identity forward.
 *
 *       PURE HASHING — one string, one sha256, no runs to re-align and no fuzzy
 *       tier. The pieces are the string's VALUE, not the source spelling that
 *       produced it: the extractor normalizes the AST first (lib/normalize-ast.mjs),
 *       so a prompt written as a quoted literal, as a `+` chain, or as a backtick
 *       template is literally the same node shape by the time it is read, and the
 *       canonical form here is byte-identical to what `canonicalText(node)` yields
 *       straight from the live AST. Matching is by this hash ALONE: one changed
 *       character is a miss, and a miss routes the string back through
 *       classification rather than to a guessed ancestor.
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
 *   added    — no identity match: a new string, needs a label. A REWORD lands
 *              here too — by design. We do not guess lineage from a text prefix;
 *              a reworded prompt is a new string that the labeler re-identifies
 *              (upgrade.sh hands it the removed-id list so it can re-use the id).
 *   removed  — a prev entry with no identity match in the new catalog.
 * `added` (and any `carried` entry that is still anonymous, e.g. the extractor's
 * seed couldn't name it) forms the relabeling worklist.
 *
 * This module is pure (no I/O beyond reading JSON when run as a CLI) so it is
 * unit-testable against two committed catalogs.
 */

import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { pathToFileURL } from "node:url";
// The ONE marker-escaping rule, shared with the normalizer so the catalog's
// canonical form and a live AST node's canonical form are the same bytes.
// (normalize-ast.mjs is dependency-free, so this stays a pure module.)
import { escapeMarkers, SLOT } from "../lib/normalize-ast.mjs";

export const HASH_ALGO = "sha256";
export const sha256 = (text) =>
  createHash(HASH_ALGO).update(text, "utf-8").digest("hex");

/**
 * Canonical byte form of an entry: the single string a normalized AST node
 * renders to. Literal runs interleaved with BARE `${}` slot markers — see
 * lib/normalize-ast.mjs `canonicalText`, which produces byte-identical output
 * straight from the node. Keeping both sides on one encoding is what makes
 * `identityHash(entry)` and `sha256(canonicalText(node))` the same number by
 * construction, so the catalog and the patcher can never disagree about what
 * "the same prompt" is.
 *
 * The slot carries NO variable name and no index, so nothing a minifier does to
 * identifiers can churn the hash. `identifiers[]` is passed only for its LENGTH
 * here; its values are display scaffolding for the `.md` (see renderSlot).
 *
 * The encoding is injective: a literal `\` or `${` inside a run is escaped, so a
 * run can never forge a slot marker and ["ab","c"] can never collide with
 * ["a","bc"] (their markers land in different places).
 */
export const canonicalize = (pieces, identifiers = []) => {
  let out = "";
  for (let i = 0; i < pieces.length; i++) {
    out += escapeMarkers(pieces[i]);
    if (i < identifiers.length) out += SLOT; // anonymous: the variable is not hashed
  }
  return out;
};

/**
 * Render the slot between run i and run i+1 as it appears in the `.md`.
 * The runs hold literal text only, so the `${` / `}` are written HERE — they
 * are display scaffolding for the human-editable file, never part of a piece
 * and never part of the identity hash. Every reconstruction in the repo must
 * agree on this spelling, because patching splits the edited `.md` back apart
 * on exactly these markers.
 *
 * THE EDITING CONTRACT. An un-nerf may rewrite the prose around these markers
 * freely, but it must keep EVERY `${...}` placeholder, in the SAME ORDER. The
 * hash is blind to which variable is behind a slot, so the patcher rebinds
 * positionally — the i-th placeholder in the edited body becomes the i-th
 * interpolation the stock string already had. Dropping, adding, or reordering
 * one has no valid binding and fails the splice closed rather than silently
 * wiring a prompt to the wrong value.
 */
export const renderSlot = (identifiers, identifierMap, i) => {
  const label = identifiers[i];
  return `\${${identifierMap[String(label)] ?? `UNKNOWN_${label}`}}`;
};

/**
 * Reconstruct a prompt body by interleaving runs with `${HUMAN_NAME}` slots.
 * `pieces.length === identifiers.length + 1`, so this alternates run, slot,
 * run, … and always ends on a run.
 */
export function reconstruct(prompt) {
  const { pieces, identifiers, identifierMap } = prompt;
  let out = "";
  for (let i = 0; i < pieces.length; i++) {
    out += pieces[i];
    if (i < identifiers.length) out += renderSlot(identifiers, identifierMap, i);
  }
  return out;
}

export const identityHash = (p) => sha256(canonicalize(p.pieces ?? [], p.identifiers ?? []));
export const driftHash = (p) => sha256(reconstruct(p));

const isAnonymous = (p) => !p.id || !p.name;

/**
 * Build a lookup index over a catalog's prompts:
 *   byIdentity  Map identityHash -> entry
 *   byId        Map id -> entry
 */
export function buildIndex(catalog) {
  const prompts = catalog.prompts ?? [];
  const byIdentity = new Map();
  const byId = new Map();
  for (const p of prompts) {
    byIdentity.set(identityHash(p), p);
    if (p.id) byId.set(p.id, p);
  }
  return { byIdentity, byId, prompts };
}

/**
 * Diff a freshly-extracted catalog against the previous labeled one.
 * Returns { carried, added, removed, worklist } where each item is
 * { entry, prev? , reason }.
 */
export function diffCatalogs(prevCatalog, nextCatalog) {
  const prev = buildIndex(prevCatalog);
  const next = buildIndex(nextCatalog);

  const carried = [];
  const added = [];
  const seenPrevIdentity = new Set();

  for (const entry of next.prompts) {
    const ih = identityHash(entry);
    const exact = prev.byIdentity.get(ih);
    if (exact) {
      seenPrevIdentity.add(identityHash(exact));
      carried.push({ entry, prev: exact, reason: "identity-match" });
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
    ...added.map((x) => ({ ...x, kind: "added" })),
    ...carried
      .filter((x) => isAnonymous(x.entry) && isAnonymous(x.prev))
      .map((x) => ({ ...x, kind: "anonymous" })),
  ];

  return { carried, added, removed, worklist };
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
      `carried ${d.carried.length}  added ${d.added.length}  removed ${d.removed.length}`
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

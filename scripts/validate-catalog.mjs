#!/usr/bin/env node
/**
 * validate-catalog.mjs — structural + behavioral gates on a generated prompt
 *                        catalog, replacing "byte-identical to skrabe" with
 *                        checks that hold even when our output legitimately
 *                        differs (per the Codex review of the plan).
 *
 * GATES (all must pass under --strict; otherwise reported as warnings)
 *   1. no anonymous prompts        — every entry has a non-empty id AND name
 *   2. no UNKNOWN_ placeholders     — no identifierMap value or reconstructed
 *                                     body contains `UNKNOWN_<n>` (a slot the
 *                                     labeler failed to name)
 *   3. no empty identifierMap slots — every declared slot has a name
 *   4. id integrity                 — no two DIFFERENT-content prompts share an
 *                                     id (same-id + same-content = legit
 *                                     multi-site duplicate, allowed)
 *   5. identifierMap name uniqueness within a prompt
 *   6. id-diff vs previous catalog  — reports added/removed (informational;
 *                                     a large removed set is suspicious)
 *
 * USAGE
 *   node validate-catalog.mjs <catalog.json> [<prevCatalog.json>] [--strict]
 */

import { readFileSync } from "node:fs";
import { identityHash, reconstruct } from "./prompt-index.mjs";

const raw = process.argv.slice(2);
const strict = raw.includes("--strict");
// --ack-removed <N>: an operator who has manually verified that a large id-removal
// is genuine upstream deletion (not an extraction miss) passes the EXACT removed
// count to downgrade gate 6 from failure to warning. Requiring an exact-count match
// keeps the safety net: a future run whose removal count differs still fails.
let ackRemoved = null;
const args = [];
for (let i = 0; i < raw.length; i++) {
  const a = raw[i];
  if (a === "--strict") continue;
  if (a === "--ack-removed") { ackRemoved = Number(raw[++i]); continue; }
  if (a.startsWith("--ack-removed=")) { ackRemoved = Number(a.slice("--ack-removed=".length)); continue; }
  args.push(a);
}
const [catalogPath, prevPath] = args;
if (!catalogPath) {
  console.error("usage: node validate-catalog.mjs <catalog.json> [<prevCatalog.json>] [--strict]");
  process.exit(2);
}
const catalog = JSON.parse(readFileSync(catalogPath, "utf-8"));
const prompts = catalog.prompts ?? [];
const issues = [];
const warn = [];

// 1. anonymous
const anon = prompts.filter((p) => !p.id || !p.name);
if (anon.length) issues.push(`${anon.length} anonymous prompt(s) (empty id or name)`);

// 2 + 3. UNKNOWN_ / empty slots
let unknown = 0,
  emptySlots = 0,
  dupNames = 0;
for (const p of prompts) {
  const map = p.identifierMap ?? {};
  for (const [k, v] of Object.entries(map)) {
    if (!v) emptySlots++;
    else if (/^UNKNOWN_/.test(String(v))) unknown++;
  }
  if (/UNKNOWN_\d+/.test(reconstruct(p))) unknown++;
  const names = Object.values(map).filter(Boolean);
  if (new Set(names).size !== names.length) dupNames++;
}
if (unknown) issues.push(`${unknown} UNKNOWN_ placeholder(s) in maps/bodies`);
if (emptySlots) issues.push(`${emptySlots} empty identifierMap slot(s)`);
if (dupNames) issues.push(`${dupNames} prompt(s) with duplicate identifierMap names`);

// 4. id integrity — same id must mean same content (multi-site dup) not a collision
const byId = new Map();
for (const p of prompts) {
  if (!p.id) continue;
  const h = identityHash(p);
  if (!byId.has(p.id)) byId.set(p.id, new Set());
  byId.get(p.id).add(h);
}
const collisions = [...byId.entries()].filter(([, hs]) => hs.size > 1).map(([id]) => id);
// Distinguish collisions WE introduced (a relabel bug → fail) from ones inherited
// from the seed catalog (a pre-existing upstream artifact → warn, don't block).
let inheritedCollisions = new Set();
if (prevPath) {
  const prev0 = JSON.parse(readFileSync(prevPath, "utf-8"));
  const pById = new Map();
  for (const p of prev0.prompts ?? []) {
    if (!p.id) continue;
    if (!pById.has(p.id)) pById.set(p.id, new Set());
    pById.get(p.id).add(identityHash(p));
  }
  inheritedCollisions = new Set([...pById.entries()].filter(([, hs]) => hs.size > 1).map(([id]) => id));
}
const newCollisions = collisions.filter((id) => !inheritedCollisions.has(id));
const inherited = collisions.filter((id) => inheritedCollisions.has(id));
if (inherited.length) warn.push(`${inherited.length} inherited id collision(s) from seed (pre-existing upstream): ${inherited.slice(0, 5).join(", ")}`);
if (newCollisions.length)
  issues.push(
    `${newCollisions.length} NEW id collision(s) (same id, different content): ${newCollisions.slice(0, 5).join(", ")}`
  );

// 6. id-diff vs prev
if (prevPath) {
  const prev = JSON.parse(readFileSync(prevPath, "utf-8"));
  const pids = new Set(prev.prompts.filter((p) => p.id).map((p) => p.id));
  const nids = new Set(prompts.filter((p) => p.id).map((p) => p.id));
  const added = [...nids].filter((x) => !pids.has(x));
  const removed = [...pids].filter((x) => !nids.has(x));
  warn.push(`vs prev: +${added.length} ids, -${removed.length} ids`);
  if (removed.length > 50) {
    if (ackRemoved !== null && ackRemoved === removed.length) {
      warn.push(`${removed.length} ids removed vs prev — acknowledged via --ack-removed ${ackRemoved} (operator verified genuine upstream deletions)`);
    } else {
      issues.push(
        `${removed.length} ids removed vs prev — suspiciously large; verify upstream really deleted them, ` +
          `then re-run with --ack-removed ${removed.length}`
      );
    }
  }
}

console.log(`catalog ${catalogPath}: ${prompts.length} prompts, version ${catalog.version}`);
for (const w of warn) console.log(`  · ${w}`);
if (!issues.length) {
  console.log("  ✓ all structural gates pass");
  process.exit(0);
}
console.error(`  ✗ ${issues.length} gate failure(s):`);
for (const i of issues) console.error(`    - ${i}`);
process.exit(strict ? 1 : 0);

#!/usr/bin/env node
/**
 * relabel.mjs — prepare a semantic-labeling worklist for a freshly-extracted
 *               prompt catalog, and merge Claude's labels back in.
 *
 * The vendored extractor (seeded with our previous catalog) already carries an
 * id/name/description/identifierMap forward for every prompt whose text is
 * unchanged or only lightly reworded, and names anything in skrabe's frozen
 * NEW_PROMPT_ASSIGNMENTS table. What it leaves ANONYMOUS (empty id/name) or that
 * our SHA-256 diff flags as genuinely new/reworded is the delta — a few dozen
 * fragments per release. This script hands that delta to Claude Code (launched
 * headless by upgrade.sh) for semantic labeling, then validates + merges the
 * result.
 *
 *   prepare <prevCatalog> <nextCatalog> <workDir> [--chunk-size N] [--chunk-chars N]
 *       Compute the diff, write <workDir>/worklist.json (the fragments to label)
 *       and <workDir>/LABELING-TASK.md (the instructions Claude follows). Prints
 *       the worklist size. If the worklist is empty, exits 0 with nothing to do.
 *       Also splits the worklist into <workDir>/chunk-NNN.json: ONE labeling job
 *       per chunk. A single job asked to emit ~1000 objects truncates, and
 *       merge() then hard-fails on the missing refs. Chunks are capped on BOTH
 *       item count (120) and total body chars (120k) — body sizes span four
 *       orders of magnitude, so an item cap alone can hand one job more text
 *       than fits in its context.
 *
 *   collect <workDir> <nextCatalog.json>
 *       Concatenate the per-chunk labels-NNN.json into the single labels.json
 *       merge() expects. Exits 1 listing the missing refs if any chunk failed or
 *       came back short, so the caller can re-run just those chunks. Also
 *       de-duplicates ids that two chunks invented independently for different
 *       fragments — chunks cannot coordinate, and merge() would abort on the
 *       collision.
 *
 *   merge <nextCatalog> <workDir>/labels.json <outCatalog>
 *       Validate Claude's labels (id uniqueness, slot coverage, no UNKNOWN_),
 *       patch them into the catalog, and write <outCatalog>. Exits non-zero if
 *       any worklist entry is still anonymous or a gate fails.
 *
 * Identity stability: matching is PURE HASHING, so a reworded prompt does not
 * carry forward — it arrives as an `added` fragment while its old entry shows up
 * in the diff's `removed` list. Since our apply-unnerfs.py rules are keyed by
 * `<id>.md`, a churned id would silently orphan an un-nerf rule. So prepare()
 * also writes `removed.json` (the ids/names/samples that just disappeared) and
 * instructs Claude: if a fragment is a reword of one of those, RE-USE that id
 * verbatim. That id re-use is the only thing keeping `<id>.md` stable across an
 * upstream reword; `preserveId` still hard-pins the `anonymous` case where a
 * carried entry was never named.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { diffCatalogs, reconstruct } from "./prompt-index.mjs";

function loadJson(p) {
  return JSON.parse(readFileSync(p, "utf-8"));
}

/** Distinct id prefixes present in the catalog, for convention guidance. */
function idPrefixes(catalog) {
  const counts = {};
  for (const p of catalog.prompts ?? []) {
    const m = (p.id || "").match(/^([a-z]+(?:-[a-z]+)?)-/);
    if (m) counts[m[1]] = (counts[m[1]] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);
}

function slotCount(entry) {
  // number of distinct interpolation slots = size of identifierMap
  return Object.keys(entry.identifierMap ?? {}).length;
}

function prepare(prevPath, nextPath, workDir, chunkSize, chunkChars) {
  const prev = loadJson(prevPath);
  const next = loadJson(nextPath);
  const { worklist, removed } = diffCatalogs(prev, next);
  mkdirSync(workDir, { recursive: true });

  const items = worklist.map((w, i) => ({
    ref: i,
    kind: w.kind, // "added" | "anonymous"
    // Only an `anonymous` carry has a known prior identity to pin. An `added`
    // fragment may still BE a reword — but which one is a judgment call, so it
    // is offered via removed.json rather than asserted here.
    preserveId: w.kind === "anonymous" ? w.prev?.id || null : null,
    prevName: w.prev?.name || null,
    prevDescription: w.prev?.description || null,
    slots: slotCount(w.entry), // how many ${...} slots need semantic names
    // The current (possibly-empty) identifierMap so Claude sees slot indices.
    identifierMapKeys: Object.keys(w.entry.identifierMap ?? {}),
    // The reconstructed body (with current placeholder names) — what Claude reads.
    body: reconstruct(w.entry),
  }));

  // Ids that vanished this release. Under pure hashing an upstream reword shows
  // up as (removed old id + added fresh fragment), so this list is how the
  // labeler recognizes a reword and re-uses the id instead of minting one.
  // De-duplicated by id: a multi-site prompt removes once per site.
  const removedById = new Map();
  for (const p of removed) {
    if (!p.id || removedById.has(p.id)) continue;
    removedById.set(p.id, {
      id: p.id, name: p.name || "", description: p.description || "",
      sample: reconstruct(p).slice(0, 400),
    });
  }
  const removedItems = [...removedById.values()];

  writeFileSync(join(workDir, "worklist.json"), JSON.stringify(items, null, 2));
  writeFileSync(join(workDir, "removed.json"), JSON.stringify(removedItems, null, 2));
  writeFileSync(join(workDir, "LABELING-TASK.md"), labelingInstructions(next, items.length, removedItems.length));
  // Stash the diff refs so merge can map labels back to catalog entries by identity.
  const refMap = worklist.map((w) => ({
    ref: 0,
    identity: null,
  }));
  void refMap;
  // We map by body-equality at merge time (see merge()), so no extra state needed.
  // Chunking. One labeling job per chunk: a single job asked to emit ~1000
  // objects truncates, and `merge` then hard-fails on the missing refs. Chunks
  // live in THIS directory (not subdirectories) so the relative paths in
  // LABELING-TASK.md stay valid. `worklist.json` above is still the full list —
  // merge() reads it, and collect() uses the chunks only to know the ref set.
  //
  // Pack by BOTH caps. Item count alone is not enough: body sizes span four
  // orders of magnitude (median ~175 chars, but a few prompts run past 100 KB),
  // so a fixed 120 items produced a 947 KB chunk — ~237k tokens, more than the
  // labeling job's whole context. A body larger than chunkChars gets a chunk to
  // itself rather than being dropped or split.
  const chunks = [];
  let cur = [];
  let curChars = 0;
  for (const it of items) {
    if (cur.length && (cur.length >= chunkSize || curChars + it.body.length > chunkChars)) {
      chunks.push(cur);
      cur = [];
      curChars = 0;
    }
    cur.push(it);
    curChars += it.body.length;
  }
  if (cur.length) chunks.push(cur);
  chunks.forEach((c, i) => {
    writeFileSync(join(workDir, `chunk-${String(i).padStart(3, "0")}.json`), JSON.stringify(c, null, 2));
  });

  const chunkChars2 = chunks.map((c) => c.reduce((a, it) => a + it.body.length, 0));
  console.log(`worklist: ${items.length} fragment(s) to label -> ${join(workDir, "worklist.json")}`);
  console.log(`removed:  ${removedItems.length} id(s) that vanished -> ${join(workDir, "removed.json")}`);
  console.log(
    `chunks:   ${chunks.length} (max ${chunkSize} item(s) / ${chunkChars} body chars each; ` +
      `largest ${Math.max(...chunkChars2)} chars)`,
  );
  return items.length;
}

// Gather the per-chunk labels-NNN.json files into the single labels.json that
// merge() expects, and make the result survivable:
//   * every ref in the worklist must be labeled exactly once (else exit 1 with
//     the missing refs, so the caller can re-run just those chunks),
//   * ids invented independently by two chunks for two DIFFERENT fragments are
//     de-duplicated here. merge() would otherwise detect the collision and
//     abort the whole run (see the `collides` gate); chunks cannot coordinate,
//     so the fix has to happen after the fact. Lowest ref keeps the bare id.
//
// The catalog is part of that de-duplication, not just the other chunks. Upstream
// ships sibling wordings of the same prompt (the `-concise` variants), so a
// carried-forward entry can already hold the obvious id while a NEW variant of
// the same prompt is in the worklist. Every carried entry's text is verbatim in
// the fresh bundle (gen-catalog carries on exact identity hash or not at all),
// so the old id is live and the new variant must take the suffix.
function collect(workDir, catalogPath) {
  const items = loadJson(join(workDir, "worklist.json"));
  const bodyByRef = new Map(items.map((it) => [it.ref, it.body]));
  const pinnedRefs = new Set(items.filter((it) => it.preserveId).map((it) => it.ref));

  const labels = [];
  const seenRefs = new Set();
  for (const f of readdirSync(workDir).filter((f) => /^labels-\d+\.json$/.test(f)).sort()) {
    for (const l of loadJson(join(workDir, f))) {
      if (seenRefs.has(l.ref)) continue; // a re-run of a chunk supersedes nothing; first wins
      seenRefs.add(l.ref);
      labels.push(l);
    }
  }

  const missing = items.map((it) => it.ref).filter((r) => !seenRefs.has(r));
  if (missing.length) {
    console.error(`relabel collect INCOMPLETE: ${missing.length}/${items.length} ref(s) unlabeled`);
    console.error(`  missing refs: ${missing.slice(0, 60).join(", ")}${missing.length > 60 ? " ..." : ""}`);
    process.exit(1);
  }

  // De-duplicate ids across chunks. Only a genuine clash matters: same id, and
  // the two fragments' bodies differ.
  labels.sort((a, b) => a.ref - b.ref);
  const labelByRef = new Map(labels.map((l) => [l.ref, l]));
  const byId = new Map();
  // Seed with ids the catalog already holds, so the check here is the same
  // predicate merge() applies: same id + different body = collision. Worklist
  // entries are still anonymous at this point, so they never seed themselves.
  if (catalogPath) {
    for (const p of loadJson(catalogPath).prompts ?? []) {
      if (p.id && !byId.has(p.id)) byId.set(p.id, { body: reconstruct(p), ref: null });
    }
  }
  let renamed = 0;
  for (const l of labels) {
    const body = bodyByRef.get(l.ref);
    const prior = byId.get(l.id);
    if (!prior) { byId.set(l.id, { body, ref: l.ref }); continue; }
    if (prior.body === body) continue; // same fragment text: sharing an id is legitimate
    // Pick which side takes the suffix. A pinned ref must keep its id verbatim
    // (merge hard-fails on a preserveId mismatch), so it never loses.
    let loser = l;
    if (pinnedRefs.has(l.ref)) {
      if (prior.ref === null) continue; // catalog entry: merge exempts preserveId from `collides`
      if (pinnedRefs.has(prior.ref)) {
        console.error(`relabel collect FAILED: refs ${prior.ref} and ${l.ref} both pin id "${l.id}"`);
        process.exit(1);
      }
      loser = labelByRef.get(prior.ref);
    }
    let n = 2, cand = `${l.id}-${n}`;
    while (byId.has(cand)) cand = `${l.id}-${++n}`;
    const held = prior.ref === null ? "an existing catalog entry" : `ref ${prior.ref}`;
    console.error(`  de-duped id "${l.id}" -> "${cand}" (ref ${loser.ref}, collided with ${held})`);
    loser.id = cand;
    byId.set(cand, { body: bodyByRef.get(loser.ref), ref: loser.ref });
    if (loser !== l) byId.set(l.id, { body, ref: l.ref }); // the bare id is now l's
    renamed++;
  }

  writeFileSync(join(workDir, "labels.json"), JSON.stringify(labels, null, 2));
  console.log(`collected ${labels.length} label(s)${renamed ? `, de-duped ${renamed} id(s)` : ""} -> ${join(workDir, "labels.json")}`);
}

function labelingInstructions(catalog, n, removedCount) {
  const prefixes = idPrefixes(catalog).slice(0, 14).join(", ");
  return `# Prompt-fragment labeling task

You are labeling Claude Code system-prompt fragments that were freshly extracted
from a new Claude Code release and could not be auto-identified. ${n} fragment(s)
were extracted in total; they are split into \`chunk-NNN.json\` files and **your
instructions name the ONE chunk file you must label**, plus the labels file you
must write. Label only your chunk — another job is labeling each of the others.

## Inputs (read these)
- your assigned \`chunk-NNN.json\` (this directory) — a subset of
  \`worklist.json\`, and the ONLY fragments you label. Each item:
  - \`ref\` — its stable index; echo it back unchanged.
  - \`kind\` — \`added\` (a string with no match in the previous catalog: either a
    brand-new prompt OR a reworded old one — see removed.json) or \`anonymous\`
    (carried forward unchanged but never named).
  - \`preserveId\` — if non-null, **you MUST use exactly this id** (the entry
    already has this identity and our un-nerf rules are keyed to it; a different
    id would silently break them).
  - \`prevName\` / \`prevDescription\` — the prior label to carry/refresh when present.
  - \`slots\` / \`identifierMapKeys\` — the \`\${...}\` interpolation slots. If
    \`slots > 0\`, give each slot index a SEMANTIC UPPER_SNAKE name.
  - \`body\` — the reconstructed fragment text (this is what the model actually sees).
- \`removed.json\` (this directory) — **${removedCount} id(s) that disappeared from
  the catalog in this release.** Matching is by exact hash, so a prompt that
  Anthropic merely REWORDED shows up twice: its old entry in \`removed.json\` and
  its new wording as an \`added\` worklist item. Each entry has \`id\`, \`name\`,
  \`description\`, and a 400-char \`sample\` of the old text.
- \`../../UNNERF-GUIDE.md\` (repo root) — the un-nerf thesis + the prompt taxonomy.
  Read Part 1 for how prompts are categorized; it grounds good names/descriptions.
- The previous catalog (path passed on the command line) — mimic its labeling
  style exactly.

## Output
Write the labels file named in your instructions (\`labels-NNN.json\`, matching
your chunk number) in THIS directory: a JSON array, one object per item **in
your chunk**, each:
\`\`\`json
{ "ref": <int>, "id": "<kebab-slug>", "name": "<Title Case label>",
  "description": "<one sentence, model-facing purpose>",
  "identifierMap": { "0": "SEMANTIC_NAME", "1": "..." } }
\`\`\`
- Include \`identifierMap\` ONLY if \`slots > 0\`; it must name **every** slot index
  in \`identifierMapKeys\` (no gaps), and names must be UNIQUE within the fragment.
- Emit EXACTLY one object per item in your chunk; echo each \`ref\` unchanged.
  \`ref\` values are global indices into \`worklist.json\`, so your chunk's refs do
  NOT start at 0 — copy them verbatim, never renumber.

## CRITICAL: re-use a removed id when a fragment is a reword

Before minting a fresh id for any \`added\` fragment, compare its \`body\` against
the \`sample\` of every entry in \`removed.json\`. If it is recognizably the SAME
prompt with edited wording — same role, same position in the product, same
subject matter, typically a large shared chunk of text — then **re-use that
removed id EXACTLY**, character for character. Our un-nerf rules live in files
named \`<id>.md\`; a reworded prompt that gets a new id silently orphans its
un-nerf and the restriction comes back. Carry the old \`name\`/\`description\` too
unless the reword genuinely changed what the prompt does.

Only mint a fresh id when the fragment matches NO removed entry. Never assign the
same removed id to two different fragments — pick the single best match.

## id / name conventions (match the existing catalog)
- id is kebab-case with a category prefix. Prefixes in use (most common first):
  ${prefixes}.
  Pick the prefix that fits the fragment's role (a tool description ->
  \`tool-description-<tool>\`; a tool input param -> \`tool-parameter-<tool>-<field>\`;
  a tool result string -> \`tool-result-<...>\`; an injected system reminder ->
  \`system-reminder-<...>\`; a reference/data blob -> \`data-<...>\`; an agent's
  system prompt -> \`agent-prompt-<...>\`; a skill body -> \`skill-<...>\`).
- name is a human title, usually "Category: Short Description"
  (e.g. "Tool Result: Memory write path conflict").
- description is ONE sentence stating the fragment's model-facing purpose, in the
  style of the previous catalog's descriptions. State plainly if it is model-facing.
- For \`preserveId\` items: keep the id; you may refresh name/description if the
  reword changed the meaning, else carry \`prevName\`/\`prevDescription\`.
- For a reword you matched to \`removed.json\`: use that entry's id verbatim.

Do not invent fragments, do not merge or split items, do not reorder. When done,
your labels file must have exactly one object per item in your chunk file.`;
}

function merge(nextPath, labelsPath, outPath) {
  const next = loadJson(nextPath);
  const labels = loadJson(labelsPath);
  // Rebuild the same worklist to map ref -> catalog entry deterministically.
  // We recompute against the SAME next catalog and an empty-prev sentinel is not
  // possible, so we require the caller to pass the ORIGINAL prev via env or we
  // re-derive worklist from anonymity + a saved worklist. Simplest + robust:
  // match by body-equality between labels' referenced worklist and the catalog.
  const workDir = labelsPath.replace(/\/labels\.json$/, "");
  const worklist = loadJson(join(workDir, "worklist.json"));

  const byRef = new Map(labels.map((l) => [l.ref, l]));
  const errors = [];
  const seenIds = new Set((next.prompts ?? []).filter((p) => p.id).map((p) => p.id));

  // Map each worklist item to catalog entries by body-equality. A prompt can
  // appear at MULTIPLE binary sites (same id, same content) — those collapse to
  // one worklist item but must ALL receive the label, so this is a 1→many map.
  const bodyToEntries = new Map();
  for (const p of next.prompts ?? []) {
    const b = reconstruct(p);
    if (!bodyToEntries.has(b)) bodyToEntries.set(b, []);
    bodyToEntries.get(b).push(p);
  }

  let applied = 0;
  for (const item of worklist) {
    const label = byRef.get(item.ref);
    if (!label) {
      errors.push(`ref ${item.ref}: no label emitted`);
      continue;
    }
    const entries = bodyToEntries.get(item.body);
    if (!entries || !entries.length) {
      errors.push(`ref ${item.ref}: could not locate catalog entry for body`);
      continue;
    }
    // Gate: preserveId must be honored.
    if (item.preserveId && label.id !== item.preserveId) {
      errors.push(`ref ${item.ref}: id "${label.id}" != required preserveId "${item.preserveId}"`);
      continue;
    }
    // Gate: id present + unique (a same-content multi-site dup legitimately
    // shares its id; only flag a collision with a DIFFERENT-content prompt).
    if (!label.id) {
      errors.push(`ref ${item.ref}: empty id`);
      continue;
    }
    const collides = (next.prompts ?? []).some(
      (p) => p.id === label.id && !entries.includes(p) && reconstruct(p) !== item.body
    );
    if (collides && !item.preserveId) {
      errors.push(`ref ${item.ref}: duplicate id "${label.id}" (collides with different content)`);
      continue;
    }
    // Gate: slot coverage + uniqueness.
    let map = null;
    if (item.slots > 0) {
      map = label.identifierMap || {};
      for (const k of item.identifierMapKeys) {
        if (!map[k]) errors.push(`ref ${item.ref}: identifierMap missing slot ${k}`);
      }
      const names = Object.values(map);
      if (new Set(names).size !== names.length)
        errors.push(`ref ${item.ref}: duplicate identifierMap names`);
      if (names.some((v) => /^UNKNOWN_/.test(String(v))))
        errors.push(`ref ${item.ref}: UNKNOWN_ placeholder left in identifierMap`);
    }
    for (const entry of entries) {
      if (map) entry.identifierMap = { ...entry.identifierMap, ...map };
      entry.name = label.name || entry.name;
      entry.id = label.id;
      entry.description = label.description || entry.description;
    }
    seenIds.add(label.id);
    applied++;
  }

  // Final structural gate over the WHOLE catalog.
  const anon = (next.prompts ?? []).filter((p) => !p.id || !p.name);
  if (anon.length) errors.push(`${anon.length} prompt(s) still anonymous after merge`);

  if (errors.length) {
    console.error(`relabel merge FAILED (${errors.length} issue(s)):`);
    for (const e of errors.slice(0, 40)) console.error("  - " + e);
    process.exit(1);
  }
  writeFileSync(outPath, JSON.stringify(next, null, 2));
  console.log(`merged ${applied} label(s); catalog written -> ${outPath}`);
}

const DEFAULT_CHUNK_SIZE = 120;
// ~30k tokens of prompt bodies per labeling job, leaving the rest of the window
// for LABELING-TASK.md, the guide, and the job's own output.
const DEFAULT_CHUNK_CHARS = 120000;

function main(argv) {
  const nums = { "--chunk-size": DEFAULT_CHUNK_SIZE, "--chunk-chars": DEFAULT_CHUNK_CHARS };
  for (const flag of Object.keys(nums)) {
    const i = argv.indexOf(flag);
    if (i < 0) continue;
    const v = parseInt(argv[i + 1], 10);
    if (!Number.isFinite(v) || v < 1) {
      console.error(`${flag} must be a positive integer`);
      return 2;
    }
    nums[flag] = v;
    argv = argv.filter((_, j) => j !== i && j !== i + 1);
  }
  const [cmd, ...rest] = argv;
  if (cmd === "prepare" && rest.length === 3)
    return prepare(rest[0], rest[1], rest[2], nums["--chunk-size"], nums["--chunk-chars"]) >= 0 ? 0 : 1;
  if (cmd === "collect" && rest.length === 2) {
    collect(rest[0], rest[1]);
    return 0;
  }
  if (cmd === "merge" && rest.length === 3) {
    merge(rest[0], rest[1], rest[2]);
    return 0;
  }
  console.error(
    "usage:\n" +
      "  node relabel.mjs prepare <prevCatalog.json> <nextCatalog.json> <workDir> [--chunk-size N] [--chunk-chars N]\n" +
      "  node relabel.mjs collect <workDir> <nextCatalog.json>\n" +
      "  node relabel.mjs merge   <nextCatalog.json> <workDir/labels.json> <outCatalog.json>"
  );
  return 2;
}

process.exit(main(process.argv.slice(2)));

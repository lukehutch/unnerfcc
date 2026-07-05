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
 *   prepare <prevCatalog> <nextCatalog> <workDir>
 *       Compute the diff, write <workDir>/worklist.json (the fragments to label)
 *       and <workDir>/LABELING-TASK.md (the instructions Claude follows). Prints
 *       the worklist size. If the worklist is empty, exits 0 with nothing to do.
 *
 *   merge <nextCatalog> <workDir>/labels.json <outCatalog>
 *       Validate Claude's labels (id uniqueness, slot coverage, no UNKNOWN_),
 *       patch them into the catalog, and write <outCatalog>. Exits non-zero if
 *       any worklist entry is still anonymous or a gate fails.
 *
 * Identity stability: for a `changed` (reworded) fragment we pass Claude the
 * PREVIOUS id and instruct it to preserve it — our apply-unnerfs.py rules are
 * keyed by `<id>.md`, so a churned id would silently orphan an un-nerf rule.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
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

function prepare(prevPath, nextPath, workDir) {
  const prev = loadJson(prevPath);
  const next = loadJson(nextPath);
  const { worklist } = diffCatalogs(prev, next);
  mkdirSync(workDir, { recursive: true });

  const items = worklist.map((w, i) => ({
    ref: i,
    kind: w.kind, // "changed" | "added" | "anonymous"
    // Preserve the id on a reword; mint a new one only for genuinely-added.
    preserveId: w.kind === "changed" || w.kind === "anonymous" ? w.prev?.id || null : null,
    prevName: w.prev?.name || null,
    prevDescription: w.prev?.description || null,
    slots: slotCount(w.entry), // how many ${...} slots need semantic names
    // The current (possibly-empty) identifierMap so Claude sees slot indices.
    identifierMapKeys: Object.keys(w.entry.identifierMap ?? {}),
    // The reconstructed body (with current placeholder names) — what Claude reads.
    body: reconstruct(w.entry),
  }));

  writeFileSync(join(workDir, "worklist.json"), JSON.stringify(items, null, 2));
  writeFileSync(join(workDir, "LABELING-TASK.md"), labelingInstructions(next, items.length));
  // Stash the diff refs so merge can map labels back to catalog entries by identity.
  const refMap = worklist.map((w) => ({
    ref: 0,
    identity: null,
  }));
  void refMap;
  // We map by body-equality at merge time (see merge()), so no extra state needed.
  console.log(`worklist: ${items.length} fragment(s) to label -> ${join(workDir, "worklist.json")}`);
  return items.length;
}

function labelingInstructions(catalog, n) {
  const prefixes = idPrefixes(catalog).slice(0, 14).join(", ");
  return `# Prompt-fragment labeling task

You are labeling **${n} Claude Code system-prompt fragment(s)** that were freshly
extracted from a new Claude Code release and could not be auto-identified.

## Inputs (read these)
- \`worklist.json\` (this directory) — the fragments to label. Each item:
  - \`ref\` — its stable index; echo it back unchanged.
  - \`kind\` — \`added\` (brand-new prompt), \`changed\` (a reword of an existing
    prompt), or \`anonymous\` (carried but never named).
  - \`preserveId\` — if non-null, **you MUST use exactly this id** (the fragment
    is a reworded version of an existing prompt, and our un-nerf rules are keyed
    to it; a different id would silently break them). Only \`kind:"added"\` items
    have \`preserveId: null\` and get a fresh id.
  - \`prevName\` / \`prevDescription\` — the prior label to carry/refresh when present.
  - \`slots\` / \`identifierMapKeys\` — the \`\${...}\` interpolation slots. If
    \`slots > 0\`, give each slot index a SEMANTIC UPPER_SNAKE name.
  - \`body\` — the reconstructed fragment text (this is what the model actually sees).
- \`../../UNNERF-GUIDE.md\` (repo root) — the un-nerf thesis + the prompt taxonomy.
  Read Part 1 for how prompts are categorized; it grounds good names/descriptions.
- The previous catalog (path passed on the command line) — mimic its labeling
  style exactly.

## Output
Write \`labels.json\` in THIS directory: a JSON array, one object per worklist
item, each:
\`\`\`json
{ "ref": <int>, "id": "<kebab-slug>", "name": "<Title Case label>",
  "description": "<one sentence, model-facing purpose>",
  "identifierMap": { "0": "SEMANTIC_NAME", "1": "..." } }
\`\`\`
- Include \`identifierMap\` ONLY if \`slots > 0\`; it must name **every** slot index
  in \`identifierMapKeys\` (no gaps), and names must be UNIQUE within the fragment.
- Emit EXACTLY one object per worklist item; echo each \`ref\` unchanged.

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

Do not invent fragments, do not merge or split items, do not reorder. When done,
\`labels.json\` must have exactly ${n} objects.`;
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

function main(argv) {
  const [cmd, ...rest] = argv;
  if (cmd === "prepare" && rest.length === 3) return prepare(rest[0], rest[1], rest[2]) >= 0 ? 0 : 1;
  if (cmd === "merge" && rest.length === 3) {
    merge(rest[0], rest[1], rest[2]);
    return 0;
  }
  console.error(
    "usage:\n" +
      "  node relabel.mjs prepare <prevCatalog.json> <nextCatalog.json> <workDir>\n" +
      "  node relabel.mjs merge   <nextCatalog.json> <workDir/labels.json> <outCatalog.json>"
  );
  return 2;
}

process.exit(main(process.argv.slice(2)));

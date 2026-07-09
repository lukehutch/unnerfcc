#!/usr/bin/env node
/**
 * classify.mjs — classify every string literal in a Claude Code bundle as
 *                prompt / non-prompt (and, for prompts, whether it wants
 *                un-nerfing), using Claude — NOT a heuristic guess.
 *
 * DESIGN
 * ------
 * We do not guess which literals are prompts. We SHA-256-fingerprint every
 * string (by its content = pieces.join(''), so a minified-var change doesn't
 * churn the hash) and keep a persistent store `data/string-catalog.json`:
 *
 *   sha256 -> {
 *     class:               "prompt" | "non-prompt",
 *     unnerf:              boolean, // a prompt that carries brevity/effort nerfs
 *     proposedName:        string,  // PROPOSED kebab identity (maintainer signs off)
 *     proposedDescription: string,  // one-line editorial description of the prompt
 *     slots:               string,  // per-${...}-slot binding audit (slot-awareness)
 *     notes:               string,  // one line, why
 *     policyVersion:       number,  // the un-nerf POLICY version this was judged under
 *     ccFirstSeen:         string,  // CC version the string first appeared in
 *     sample:              string   // first ~200 chars, for humans
 *   }
 *
 * A string is (re)sent to Claude only when it is:
 *   - NEW   (its sha256 isn't in the store), or
 *   - STALE (class==="prompt" but classified under an OLDER policy version than
 *            data/unnerf-policy-version — the un-nerf policy changed, so its
 *            un-nerf decision must be re-judged). Non-prompts are never re-judged.
 *
 * So the expensive work happens once; each new CC release only classifies its
 * genuinely-new strings, and a policy bump only re-touches prompt strings.
 *
 * ONE JOB, NOT MANY (maintainer policy, 2026-07-09)
 * -------------------------------------------------
 * A new release often has >500 new fragments. We do NOT fan those out into many
 * separate Opus jobs. All work items are written to a SINGLE batch.json and ONE
 * Opus job classifies the whole file, told to skip none. Then we VERIFY: any ref
 * the job dropped is re-sent as a small top-up job (same single-file shape) until
 * none remain — so the happy path is exactly one job, and extra jobs only ever
 * cover strings a prior pass skipped. If it can't complete (a round makes no
 * progress), the run exits non-zero and lists what's still unclassified.
 *
 * We also flag UN-NERF STATUS CHANGES: when a reworded prompt's `unnerf` flag
 * flips vs its pre-reword form, upstream added/removed a nerf → data/unnerf-
 * status-changes.json + a warning (the apply-unnerfs rule must be re-checked).
 *
 * USAGE
 *   node classify.mjs <cliJs> <ccVersion> [--limit N] [--batch N] [--dry-run]
 *     --limit N          classify at most N work items (testing / incremental)
 *     --batch N          strings per Claude call (default 0 = ALL in one file;
 *                        set N>0 only to chunk for testing / an oversized bootstrap)
 *     --max-rounds N     top-up rounds before giving up on skipped refs (default 8)
 *     --model M          classifier model (default opus; bootstrap used haiku)
 *     --shard I --shards N --shard-out F   run disjoint slices in parallel,
 *                        each writing its own file; then `merge` into the store
 *     --content-file F   classify an explicit [{hash,content}] list, not a bundle
 *     --force            (re)classify every item even if already in the store
 *     --dry-run          report the work to do; don't call Claude or write
 *   Test seam: env CLASSIFY_CLAUDE_CMD, if set, is run (sh -c) in the work dir
 *   instead of spawning claude (it must read batch.json → write result.json) —
 *   lets the top-up/completeness loop be exercised without Opus.
 */

import { readFileSync, writeFileSync, mkdtempSync, existsSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { extract } from "../lib/extract-prompts.mjs";
import { identityHash, reconstruct } from "./prompt-index.mjs";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const STORE_PATH = join(REPO, "data", "string-catalog.json");
const POLICY_PATH = join(REPO, "data", "unnerf-policy-version");

function die(m, c = 1) { console.error(`classify: ${m}`); process.exit(c); }

// Serialize the store with non-ASCII escaped to \uXXXX. The committed store uses
// this form (JSON.stringify emits literal UTF-8), so escaping keeps a re-write's
// diff limited to the records that actually changed instead of every line that
// happens to contain an em-dash or arrow.
const asciiSafe = (obj) =>
  JSON.stringify(obj, null, 1).replace(new RegExp("[\\u0080-\\uffff]", "g"), (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));

// --- args -------------------------------------------------------------------
const argv = process.argv.slice(2);
const cliJs = argv[0], ccVersion = argv[1];
const opt = (name, def) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : def; };
const LIMIT = parseInt(opt("--limit", "0"), 10) || Infinity;
// Default 0 = put ALL work items in one file / one Opus job (see "ONE JOB" note).
// --batch N>0 chunks within a round, for testing or an oversized bootstrap.
const BATCH = parseInt(opt("--batch", "0"), 10);
const MAX_ROUNDS = parseInt(opt("--max-rounds", "8"), 10);
// Model. The one-time bootstrap used Haiku (cheap, mostly non-prompts). But the
// un-nerf judgment needs real reasoning — a recall check against the existing
// rules showed Haiku caught only obvious brevity caps and missed the subtler
// implementation/process-brevity nerfs. So the DEFAULT is now Opus (latest), and
// the intended use going forward is Opus on only the NEW strings per CC release.
const MODEL = opt("--model", "opus");
const DRY = argv.includes("--dry-run");
// Sharding: run several workers in parallel over disjoint slices of the work,
// each writing to its OWN --shard-out file (no store race); merge afterward.
const SHARDS = parseInt(opt("--shards", "1"), 10);
const SHARD = parseInt(opt("--shard", "-1"), 10);
const SHARD_OUT = opt("--shard-out", null);

// merge mode: `node classify.mjs merge <store.json> <shard1.json> ...`
if (cliJs === "merge") {
  const storePath = ccVersion;
  const st = existsSync(storePath) ? JSON.parse(readFileSync(storePath, "utf8")) : { algo: "sha256", strings: {} };
  st.strings ??= {};
  let merged = 0;
  for (const f of argv.slice(2)) {
    const sh = JSON.parse(readFileSync(f, "utf8"));
    for (const [h, r] of Object.entries(sh.strings || {})) { st.strings[h] = r; merged++; }
  }
  st.strings = Object.fromEntries(Object.entries(st.strings).sort());
  writeFileSync(storePath, asciiSafe(st) + "\n");
  console.error(`merged ${merged} shard record(s) → ${storePath} (${Object.keys(st.strings).length} total)`);
  process.exit(0);
}

// --content-file <f>: classify an explicit list [{hash, content}] instead of
// extracting from a bundle (for targeted re-reads). --force: (re)classify every
// item even if already in the store.
const CONTENT_FILE = opt("--content-file", null);
const FORCE = argv.includes("--force");
if (!CONTENT_FILE && (!cliJs || !ccVersion)) die("usage: node classify.mjs <cliJs> <ccVersion> [--limit N] [--batch N] [--shard I --shards N --shard-out F] [--content-file F --force] [--dry-run]", 2);
if (!CONTENT_FILE && !existsSync(cliJs)) die(`cli.js not found: ${cliJs}`);
const CCV = ccVersion || "n/a";

const policyVersion = existsSync(POLICY_PATH) ? parseInt(readFileSync(POLICY_PATH, "utf8").trim(), 10) : 1;
const store = existsSync(STORE_PATH) ? JSON.parse(readFileSync(STORE_PATH, "utf8")) : { algo: "sha256", strings: {} };
store.strings ??= {};

// --- 1. gather the strings to consider, keyed by content hash ---------------
const byHash = new Map(); // sha256 -> { hash, content }
if (CONTENT_FILE) {
  for (const { hash, content } of JSON.parse(readFileSync(CONTENT_FILE, "utf8"))) {
    if (!byHash.has(hash)) byHash.set(hash, { hash, content });
  }
  console.error(`content-file: ${byHash.size} distinct strings`);
} else {
  const entries = extract(readFileSync(cliJs, "utf8"), CCV, { includeAll: true });
  for (const e of entries) {
    const h = identityHash(e); // sha256(pieces.join(''))
    if (!byHash.has(h)) byHash.set(h, { hash: h, content: reconstruct(e) });
  }
  console.error(`extracted ${entries.length} literals → ${byHash.size} distinct strings`);
}

// --- 2. select the work: new + policy-stale prompts (or ALL under --force) ---
const work = [];
for (const { hash, content } of byHash.values()) {
  const rec = store.strings[hash];
  if (FORCE || !rec) work.push({ hash, content, kind: rec ? "reclassify" : "new" });
  else if (rec.class === "prompt" && (rec.policyVersion ?? 0) < policyVersion)
    work.push({ hash, content, kind: "stale" });
  else if (rec && !rec.ccFirstSeen) rec.ccFirstSeen = CCV;
}
const nNew = work.filter((w) => w.kind === "new").length;
const nStale = work.length - nNew;
console.error(`to classify: ${work.length} (${nNew} new, ${nStale} policy-stale) at policy v${policyVersion}`);
if (DRY) { console.log(JSON.stringify({ distinct: byHash.size, toClassify: work.length, nNew, nStale })); process.exit(0); }
if (!work.length) { console.error("nothing to classify — store is current"); process.exit(0); }

// --- 3. classify the work: ONE file / ONE Opus job, then top up any skips ----
// Shard first (disjoint slice per worker), then apply --limit.
let todo = SHARD >= 0 ? work.filter((_, i) => i % SHARDS === SHARD) : work;
todo = todo.slice(0, LIMIT === Infinity ? todo.length : LIMIT);
// Stable ref per item (index in `todo`) — the classifier echoes it back, so a
// top-up round can carry an arbitrary sparse subset of refs unambiguously.
todo.forEach((w, i) => { w.ref = i; });
// Write to the shard file when sharding (no store race); else the main store.
const outPath = SHARD_OUT || STORE_PATH;
const outStore = SHARD_OUT ? { algo: "sha256", strings: {} } : store;
const tag = SHARD >= 0 ? `[shard ${SHARD}/${SHARDS}] ` : "";
const workDir = mkdtempSync(join(tmpdir(), `unnerfcc-classify-${CCV}-`));
const { rmSync } = await import("node:fs");
// Binary context (skrabe's pipeline "digs through the binary for context" when
// proposing identities/names). On the real upgrade path we have the bundle, so
// copy it in once and let the worker grep it to disambiguate a hard string. In
// --content-file mode there's no bundle — the worker classifies text alone.
const HAS_BUNDLE = !CONTENT_FILE && existsSync(cliJs);
if (HAS_BUNDLE) copyFileSync(cliJs, join(workDir, "cli.js"));
// Default: ALL items in one file / one job. --batch N>0 chunks within a round.
const CHUNK = BATCH > 0 ? BATCH : todo.length || 1;

// Run ONE Opus classification over `batch`, returning a Map ref->result for
// whatever it actually classified. Tolerant of a partial/absent result.json (a
// timeout or a skip): the missing refs are simply topped up in a later round.
function classifyBatch(batch, rtag) {
  const items = batch.map((w) => ({ ref: w.ref, text: w.content.slice(0, 16000) }));
  writeFileSync(join(workDir, "batch.json"), JSON.stringify(items, null, 1));
  writeFileSync(join(workDir, "TASK.md"), classifyInstructions(items.length, HAS_BUNDLE));
  try { rmSync(join(workDir, "result.json")); } catch {} // no stale result from a prior job
  const prompt =
    `Read TASK.md in this directory and follow it EXACTLY. batch.json holds ${items.length} strings. ` +
    `Classify EVERY one of them — skip none — and WRITE result.json: a JSON array of exactly ${items.length} ` +
    `objects, one per ref (echo each ref unchanged). Do not ask questions.`;
  // Test seam: CLASSIFY_CLAUDE_CMD, if set, runs (sh -c) in workDir instead of
  // claude — it must read batch.json → write result.json (see USAGE).
  const fake = process.env.CLASSIFY_CLAUDE_CMD;
  const r = fake
    ? spawnSync("sh", ["-c", fake], { cwd: workDir, stdio: ["ignore", "ignore", "inherit"], encoding: "utf8", timeout: 30 * 60 * 1000 })
    : spawnSync("claude", ["-p", "--model", MODEL, "--dangerously-skip-permissions", prompt],
        { cwd: workDir, stdio: ["ignore", "ignore", "inherit"], encoding: "utf8", timeout: 30 * 60 * 1000 });
  if (!existsSync(join(workDir, "result.json"))) {
    console.error(`  ${rtag}no result.json (claude status ${r.status}) — will retry any missing`);
    return new Map();
  }
  let results;
  try { results = JSON.parse(readFileSync(join(workDir, "result.json"), "utf8")); }
  catch (e) { console.error(`  ${rtag}could not parse result.json (${e.message}) — will retry`); return new Map(); }
  if (!Array.isArray(results)) return new Map();
  return new Map(results.filter((x) => x && Number.isInteger(x.ref)).map((x) => [x.ref, x]));
}

function storeRecord(w, res) {
  const cls = res.class === "prompt" ? "prompt" : "non-prompt";
  outStore.strings[w.hash] = {
    class: cls,
    unnerf: cls === "prompt" ? !!res.unnerf : false,
    // PROPOSED identity + slot audit (skrabe: propose names, maintainer signs
    // off). Only meaningful for prompts; carried to gen-catalog candidates.
    proposedName: cls === "prompt" ? (res.name || "").slice(0, 80) : "",
    proposedDescription: cls === "prompt" ? (res.description || "").slice(0, 200) : "",
    slots: cls === "prompt" ? (res.slots || "").slice(0, 300) : "",
    notes: (res.notes || "").slice(0, 200),
    policyVersion,
    ccFirstSeen: store.strings[w.hash]?.ccFirstSeen || CCV,
    sample: w.content.slice(0, 200),
  };
}

// Round loop: pass 1 classifies ALL items in one job; later passes top up only
// the refs a prior pass skipped. Stop when none remain, or a round makes no
// progress (claude keeps dropping the same refs — surfaced by the gate below).
const doneRefs = new Set();
let remaining = todo.slice();
let stalled = false;
for (let round = 1; remaining.length && round <= MAX_ROUNDS; round++) {
  const rtag = `${tag}round ${round}: `;
  let got = 0;
  for (let i = 0; i < remaining.length; i += CHUNK) {
    const batch = remaining.slice(i, i + CHUNK);
    const byRef = classifyBatch(batch, rtag);
    for (const w of batch) {
      const res = byRef.get(w.ref);
      if (!res) continue; // skipped this pass — retry next round
      storeRecord(w, res);
      doneRefs.add(w.ref);
      got++;
    }
    // Persist after every job so the (expensive) work is resumable.
    outStore.strings = Object.fromEntries(Object.entries(outStore.strings).sort());
    writeFileSync(outPath, asciiSafe(outStore) + "\n");
  }
  const before = remaining.length;
  remaining = remaining.filter((w) => !doneRefs.has(w.ref));
  console.error(`  ${tag}round ${round}: classified ${before - remaining.length}/${before}, ${remaining.length} still missing`);
  if (remaining.length && got === 0) { stalled = true; break; } // no progress → stop
}

// --- 3b. completeness gate — the maintainer's "were ALL classified?" check ---
if (remaining.length) {
  console.error(
    `  ${tag}✗ INCOMPLETE: ${remaining.length}/${todo.length} unclassified` +
    (stalled ? " (a round classified none — claude kept skipping them)" : ` after ${MAX_ROUNDS} round(s)`) + ":"
  );
  for (const w of remaining.slice(0, 20)) console.error(`      ${w.hash.slice(0, 12)} ${JSON.stringify(w.content.slice(0, 60))}`);
  if (remaining.length > 20) console.error(`      … and ${remaining.length - 20} more`);
  process.exitCode = 1;
} else if (todo.length) {
  console.error(`  ${tag}✓ all ${todo.length} strings classified`);
}

// --- 4. report + surface the un-nerf candidates -----------------------------
const all = Object.values(store.strings);
const prompts = all.filter((r) => r.class === "prompt");
const unnerf = prompts.filter((r) => r.unnerf);
console.error(
  `store: ${all.length} strings — ${prompts.length} prompts, ${unnerf.length} want un-nerfing, ${all.length - prompts.length} non-prompts`
);
// The un-nerf worklist: prompts Claude flagged as carrying brevity/effort nerfs.
// The maintainer turns these into scripts/apply-unnerfs.py rules (or confirms an
// existing rule covers them). Written sorted, newest-notes first for review.
const candPath = join(REPO, "data", "unnerf-candidates.json");
writeFileSync(candPath, asciiSafe(
  unnerf.map((r) => ({ sample: r.sample, notes: r.notes, ccFirstSeen: r.ccFirstSeen }))) + "\n");
console.error(`un-nerf candidates → ${candPath} (${unnerf.length})`);
// The un-nerf STATUS-CHANGE check (did a reworded prompt gain/lose a nerf?) runs
// as a separate post-gen-catalog step — scripts/unnerf-status.mjs — because it
// pairs the PREV and NEW catalogs by id, and the new catalog doesn't exist yet
// at classify time.
console.log(STORE_PATH);

function classifyInstructions(n, hasBundle) {
  return `# Classify Claude Code string literals

You are classifying **${n} string literals** extracted from the Claude Code
binary. These are the GENUINELY NEW or reshaped fragments for this release —
unchanged prompts already kept their names by content match, so what reaches you
is the supervised set. Your names here feed a maintainer sign-off, so be precise.
For each string, decide the fields below.

**Classify ALL ${n} strings. Skip NONE.** This is a single batch of every new
fragment in the release — there is no second pass that will pick up the ones you
leave out. Your \`result.json\` MUST contain exactly ${n} objects, one per ref.

## Read
- \`batch.json\` — an array of \`{ ref, text }\`. \`text\` is the string's content
  (interpolations show as \`\${...}\` or \`\${}\`). Echo each \`ref\` back unchanged.
  It may be large: if it exceeds a single read, page through it (offset/limit)
  and classify EVERY ref — do not stop at the first chunk you read.
${hasBundle ? `- \`cli.js\` — the full Claude Code bundle is in this directory. For a string
  whose class or purpose is AMBIGUOUS from its text alone, grep \`cli.js\` for a
  distinctive run of the string to read its surrounding code — how it's assigned,
  which function/tool consumes it — then decide. Use this only when in doubt; do
  not grep every string.` : `- (No bundle is available this run — classify from the text alone.)`}

## Decide, per string
1. **class**: \`"prompt"\` or \`"non-prompt"\`.
   - \`"prompt"\` = text Claude Code feeds TO THE MODEL as instructions or context:
     a system prompt, tool/agent/skill description, agent instructions, a
     \`<system-reminder>\`, an injected data/reference block, a slash-command body,
     a workflow-script prompt. If a model reads it as guidance, it's a prompt.
   - \`"non-prompt"\` = everything else: user-facing UI text, error/log/status
     messages, CLI help, code fragments, config/JSON-schema field descriptions
     that are purely structural, i18n strings, URLs, identifiers.
   - When genuinely unsure but it reads like model-facing instructions, prefer
     \`"prompt"\` (a false prompt is harmless; a missed prompt is not).
2. **unnerf** (only meaningful when class is \`"prompt"\`): \`true\` if the prompt
   caps the model's THOROUGHNESS in ANY of the ways unnerfcc lifts. Judge by
   MEANING, not keywords — the subtle ones matter most:
   - **Length / chat brevity** — "concise", "short", "respond in N sentences", "brief".
   - **Implementation brevity** — "simplest approach", "don't add abstractions",
     "**don't add error handling / validation / fallbacks**", "don't refactor",
     "match the scope", "minimal", "three similar lines beats an abstraction".
   - **Process brevity** — "as quickly as possible", "don't explore more than
     necessary", "**concise report / summary**", "**the minimum number of** agents",
     "do the minimum", "report back in N sentences", "prefer action over planning".
   - **Over-broad refusal / hedging** flags that fire on legitimate work.
   Examples that ARE un-nerf-worthy even though they don't say "be brief":
   "Don't add error handling for scenarios that can't happen" (implementation),
   "report back with a concise summary" (process), "use the minimum number of
   subagents" (process). \`false\` if the prompt has no such cap. Do NOT flag
   genuine safety / user-protection text (e.g. destructive-action care,
   authorization requirements) or functional parser/UI length limits.
3. **name** (prompts only; \`""\` for non-prompts): a PROPOSED short kebab-case
   identity a maintainer will confirm — e.g. \`tool-desc-bash\`,
   \`agent-instructions-explore\`, \`system-reminder-memory\`,
   \`judge-stopping-condition\`. Name by what the prompt IS, not its first words.
4. **description** (prompts only; \`""\` otherwise): one editorial line — what
   Claude Code uses this prompt FOR.
5. **slots** (prompts only; \`""\` if no interpolation): be SLOT-AWARE. For each
   \`\${...}\` placeholder, in order, say what it binds to (e.g.
   "slot 1 = tool name, slot 2 = file path"). Flag any slot whose role is
   unclear — a mis-bound placeholder corrupts the patch, so ambiguity matters.
6. **notes**: one short clause — why (e.g. "tone: 'short and concise'").

## Output
Write \`result.json\` in THIS directory: a JSON array of exactly ${n} objects:
\`\`\`json
{ "ref": <int>, "class": "prompt"|"non-prompt", "unnerf": <bool>,
  "name": "<kebab-id or ''>", "description": "<one line or ''>",
  "slots": "<per-slot binding or ''>", "notes": "<one clause>" }
\`\`\`
One object per input ref; echo every ref; no extra commentary.

**Before you finish, verify: the array length is exactly ${n}, every ref from
\`batch.json\` appears once, and none is missing.** If your first draft is short,
go back and classify the refs you skipped until all ${n} are present.`;
}

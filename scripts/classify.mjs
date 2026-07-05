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
 * USAGE
 *   node classify.mjs <cliJs> <ccVersion> [--limit N] [--batch N] [--dry-run]
 *     --limit N          classify at most N work items (testing / incremental)
 *     --batch N          strings per Claude call (default 100)
 *     --model M          classifier model (default opus; bootstrap used haiku)
 *     --shard I --shards N --shard-out F   run disjoint slices in parallel,
 *                        each writing its own file; then `merge` into the store
 *     --content-file F   classify an explicit [{hash,content}] list, not a bundle
 *     --force            (re)classify every item even if already in the store
 *     --dry-run          report the work to do; don't call Claude or write
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
const BATCH = parseInt(opt("--batch", "100"), 10);
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

// --- 3. classify the work in batches via Claude -----------------------------
// Shard first (disjoint slice per worker), then apply --limit.
let todo = SHARD >= 0 ? work.filter((_, i) => i % SHARDS === SHARD) : work;
todo = todo.slice(0, LIMIT === Infinity ? todo.length : LIMIT);
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
let done = 0;
for (let i = 0; i < todo.length; i += BATCH) {
  const batch = todo.slice(i, i + BATCH);
  const items = batch.map((w, j) => ({ ref: j, text: w.content.slice(0, 16000) }));
  writeFileSync(join(workDir, "batch.json"), JSON.stringify(items, null, 1));
  writeFileSync(join(workDir, "TASK.md"), classifyInstructions(batch.length, HAS_BUNDLE));
  try { rmSync(join(workDir, "result.json")); } catch {} // no stale result on a failed batch

  const prompt =
    `Read TASK.md in this directory and follow it EXACTLY. Classify the ${batch.length} strings in batch.json ` +
    `and WRITE result.json (a JSON array of ${batch.length} objects, one per ref). Do not ask questions.`;
  const r = spawnSync("claude", ["-p", "--model", MODEL, "--dangerously-skip-permissions", prompt], {
    cwd: workDir, stdio: ["ignore", "ignore", "inherit"], encoding: "utf8", timeout: 15 * 60 * 1000,
  });
  if (r.status !== 0 && !existsSync(join(workDir, "result.json"))) die(`claude exited ${r.status} on batch ${i / BATCH}`);
  let results;
  try { results = JSON.parse(readFileSync(join(workDir, "result.json"), "utf8")); }
  catch (e) { die(`could not parse result.json for batch ${i / BATCH}: ${e.message}`); }
  const byRef = new Map(results.map((x) => [x.ref, x]));

  for (let j = 0; j < batch.length; j++) {
    const w = batch[j];
    const res = byRef.get(j) || {};
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
  done += batch.length;
  // Persist after every batch so the (expensive) work is resumable.
  outStore.strings = Object.fromEntries(Object.entries(outStore.strings).sort());
  writeFileSync(outPath, asciiSafe(outStore) + "\n");
  console.error(`  ${tag}classified ${done}/${todo.length}`);
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
console.log(STORE_PATH);

function classifyInstructions(n, hasBundle) {
  return `# Classify Claude Code string literals

You are classifying **${n} string literals** extracted from the Claude Code
binary. These are the GENUINELY NEW or reshaped fragments for this release —
unchanged prompts already kept their names by content match, so what reaches you
is the small supervised set. Your names here feed a maintainer sign-off, so be
precise. For each string, decide the fields below.

## Read
- \`batch.json\` — an array of \`{ ref, text }\`. \`text\` is the string's content
  (interpolations show as \`\${...}\` or \`\${}\`). Echo each \`ref\` back unchanged.
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
One object per input ref; echo every ref; no extra commentary.`;
}

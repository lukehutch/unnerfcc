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
 *     class:         "prompt" | "non-prompt",
 *     unnerf:        boolean,     // a prompt that carries brevity/effort nerfs
 *     notes:         string,      // one line, why
 *     policyVersion: number,      // the un-nerf POLICY version this was judged under
 *     ccFirstSeen:   string,      // CC version the string first appeared in
 *     sample:        string       // first ~200 chars, for humans
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
 *     --limit N   classify at most N work items (for testing / incremental runs)
 *     --batch N   strings per Claude call (default 60)
 *     --dry-run   report the work to do; don't call Claude or write the store
 */

import { readFileSync, writeFileSync, mkdtempSync, existsSync } from "node:fs";
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

// --- args -------------------------------------------------------------------
const argv = process.argv.slice(2);
const cliJs = argv[0], ccVersion = argv[1];
const opt = (name, def) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : def; };
const LIMIT = parseInt(opt("--limit", "0"), 10) || Infinity;
const BATCH = parseInt(opt("--batch", "100"), 10);
// Bulk classification is a large, simple task — use Haiku by default (fast +
// cheap). Override with --model for a spot-check with a stronger model.
const MODEL = opt("--model", "haiku");
const DRY = argv.includes("--dry-run");
if (!cliJs || !ccVersion) die("usage: node classify.mjs <cliJs> <ccVersion> [--limit N] [--batch N] [--dry-run]", 2);
if (!existsSync(cliJs)) die(`cli.js not found: ${cliJs}`);

const policyVersion = existsSync(POLICY_PATH) ? parseInt(readFileSync(POLICY_PATH, "utf8").trim(), 10) : 1;
const store = existsSync(STORE_PATH) ? JSON.parse(readFileSync(STORE_PATH, "utf8")) : { algo: "sha256", strings: {} };
store.strings ??= {};

// --- 1. extract EVERY literal, key by content hash --------------------------
const code = readFileSync(cliJs, "utf8");
const entries = extract(code, ccVersion, { includeAll: true });
const byHash = new Map(); // sha256 -> { hash, content }
for (const e of entries) {
  const h = identityHash(e); // sha256(pieces.join(''))
  if (!byHash.has(h)) byHash.set(h, { hash: h, content: reconstruct(e) });
}
console.error(`extracted ${entries.length} literals → ${byHash.size} distinct strings`);

// --- 2. select the work: new + policy-stale prompts -------------------------
const work = [];
for (const { hash, content } of byHash.values()) {
  const rec = store.strings[hash];
  if (!rec) work.push({ hash, content, kind: "new" });
  else if (rec.class === "prompt" && (rec.policyVersion ?? 0) < policyVersion)
    work.push({ hash, content, kind: "stale" });
  // mark provenance for strings we've seen before but not this CC version
  else if (rec && !rec.ccFirstSeen) rec.ccFirstSeen = ccVersion;
}
const nNew = work.filter((w) => w.kind === "new").length;
const nStale = work.length - nNew;
console.error(`to classify: ${work.length} (${nNew} new, ${nStale} policy-stale) at policy v${policyVersion}`);
if (DRY) { console.log(JSON.stringify({ distinct: byHash.size, toClassify: work.length, nNew, nStale })); process.exit(0); }
if (!work.length) { console.error("nothing to classify — store is current"); process.exit(0); }

// --- 3. classify the work in batches via Claude -----------------------------
const todo = work.slice(0, LIMIT === Infinity ? work.length : LIMIT);
const workDir = mkdtempSync(join(tmpdir(), `unnerfcc-classify-${ccVersion}-`));
let done = 0;
for (let i = 0; i < todo.length; i += BATCH) {
  const batch = todo.slice(i, i + BATCH);
  const items = batch.map((w, j) => ({ ref: j, text: w.content.slice(0, 4000) }));
  writeFileSync(join(workDir, "batch.json"), JSON.stringify(items, null, 1));
  writeFileSync(join(workDir, "TASK.md"), classifyInstructions(batch.length));

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
    store.strings[w.hash] = {
      class: cls,
      unnerf: cls === "prompt" ? !!res.unnerf : false,
      notes: (res.notes || "").slice(0, 200),
      policyVersion,
      ccFirstSeen: store.strings[w.hash]?.ccFirstSeen || ccVersion,
      sample: w.content.slice(0, 200),
    };
  }
  done += batch.length;
  // Persist after every batch so the (expensive) work is resumable.
  store.strings = Object.fromEntries(Object.entries(store.strings).sort());
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 1) + "\n");
  console.error(`  classified ${done}/${todo.length}`);
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
writeFileSync(candPath, JSON.stringify(
  unnerf.map((r) => ({ sample: r.sample, notes: r.notes, ccFirstSeen: r.ccFirstSeen })), null, 1) + "\n");
console.error(`un-nerf candidates → ${candPath} (${unnerf.length})`);
console.log(STORE_PATH);

function classifyInstructions(n) {
  return `# Classify Claude Code string literals

You are classifying **${n} string literals** extracted from the Claude Code
binary. For each, decide two things.

## Read
- \`batch.json\` — an array of \`{ ref, text }\`. \`text\` is the string's content
  (interpolations show as \`\${...}\` or \`\${}\`). Echo each \`ref\` back unchanged.

## Decide, per string
1. **class**: \`"prompt"\` or \`"non-prompt"\`.
   - \`"prompt"\` = text Claude Code feeds TO THE MODEL as instructions or context:
     a system prompt, tool/agent/skill description, agent instructions, a
     \`<system-reminder>\`, an injected data/reference block, a slash-command body,
     a workflow-script prompt. If a model reads it as guidance, it's a prompt.
   - \`"non-prompt"\` = everything else: user-facing UI text, error/log/status
     messages, CLI help, code fragments, config/JSON-schema descriptions that are
     purely structural, i18n strings, URLs, identifiers.
   - When genuinely unsure but it reads like model-facing instructions, prefer
     \`"prompt"\` (a false prompt is harmless; a missed prompt is not).
2. **unnerf** (only meaningful when class is \`"prompt"\`): \`true\` if the prompt
   contains directives that **cap thoroughness, verbosity, effort, or
   investigation** — e.g. "be concise", "respond in N sentences", "do the
   minimum", "don't add abstractions", "as quickly as possible", "keep it short",
   or over-broad refusal/hedging flags — the kind unnerfcc lifts (rewriting
   toward thoroughness). \`false\` if it's a prompt with no such nerf. Do NOT flag
   genuine safety/user-protection text or functional length limits (parser/UI
   caps) as un-nerf-worthy.
3. **notes**: one short clause — why (e.g. "tone: 'short and concise'").

## Output
Write \`result.json\` in THIS directory: a JSON array of exactly ${n} objects:
\`\`\`json
{ "ref": <int>, "class": "prompt"|"non-prompt", "unnerf": <bool>, "notes": "<one clause>" }
\`\`\`
One object per input ref; echo every ref; no extra commentary.`;
}

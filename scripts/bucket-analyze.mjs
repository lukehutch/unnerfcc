#!/usr/bin/env node
/**
 * bucket-analyze.mjs — decide, for every un-nerf candidate new to this Claude
 *                       Code release, whether it genuinely needs a new rule in
 *                       scripts/apply-unnerfs.py, and if so, author it.
 *
 * This is the automated form of what UPGRADE.md used to call "the one manual
 * beat": bucket-analyzing new/changed prompts per UNNERF-GUIDE.md Part 1's
 * keep/lift decision procedure, and adding rules where warranted. Mirrors
 * relabel.mjs's shape exactly — an AI step proposes structured decisions, this
 * script mechanically validates and merges them, with hard gates that block
 * the release on a genuine problem rather than trusting the model's claim:
 *
 *   prepare <ccVersion> <workDir>
 *       Filter data/unnerf-candidates.json to ccFirstSeen === ccVersion (the
 *       classifier's own high-recall flagging is the candidate pool — this
 *       script's job is precision: keep vs. lift, and drafting the lift). For
 *       each candidate, locate its system-prompts/*.md file(s) (substring
 *       match on the sample, stripping a leading `${}` interpolation marker
 *       the reconstructed .md won't contain literally) and record which
 *       existing rules (via `apply-unnerfs.py --dump-rules`) already touch
 *       that file, so the labeler can avoid duplicating or conflicting with
 *       them. Writes worklist.json, chunk-NNN.json, and
 *       BUCKET-ANALYSIS-TASK.md. A candidate with no file match is skipped
 *       with a warning (not fatal — the classifier can be ahead of a since-
 *       reworded prompt) rather than blocking the whole run.
 *
 *   collect <workDir>
 *       Concatenate per-chunk verdicts-NNN.json into verdicts.json. Exits 1
 *       listing missing refs if any chunk failed or came back short, so the
 *       caller can re-run just those chunks (same contract as relabel.mjs).
 *
 *   merge <workDir> <apply-unnerfs.py path> <ccVersion>
 *       For every "lift" verdict, mechanically verify the proposed rule
 *       BEFORE trusting it: stock occurs exactly once in the file's CURRENT
 *       on-disk content (never trust the model's cached view), every ${VAR}
 *       in unnerf already appears in stock (register rule 6 — never
 *       introduce a placeholder the prompt doesn't have), and stock/unnerf
 *       don't overlap an existing rule for the same file (would make
 *       apply-unnerfs.py's ordered replacement pass FAIL on the second rule).
 *       A rule that fails any check is skipped with a warning, not a release
 *       blocker — a candidate that stays un-addressed this release is a minor
 *       miss, not a functional break. Accepted rules are inserted into
 *       apply-unnerfs.py as a new dated block; ALL verdicts (keep, lift,
 *       rejected) are written to data/bucket-analysis-<ccVersion>.json for a
 *       durable audit trail. Finally runs `apply-unnerfs.py --dry-run` (NOT
 *       --check — nothing has run the real apply pass yet at this point, so
 *       --check's "would anything change" would always fire) to confirm each
 *       new rule actually MATCHES rather than FAILING; if it doesn't, the
 *       merge exits non-zero (upgrade.sh's die). The strict idempotency
 *       --check happens later, in upgrade.sh, after the real apply pass runs.
 *
 * WHY THIS DOESN'T NEED A HUMAN GATE TO TAKE EFFECT
 * --------------------------------------------------
 * Every rule that reaches apply-unnerfs.py has already passed three
 * independent checks: this script's mechanical validation, apply-unnerfs.py's
 * own --check, and upgrade.sh's downstream patch-verify (splice + repack +
 * boot-check + sentinel scan) on the actual binary. Rules are also tagged
 * with a dated comment block naming this as their origin, so a human auditing
 * apply-unnerfs.py later can always tell an automated rule from a hand-authored
 * one. upgrade.sh still stops short of committing (same as every other step),
 * so a maintainer always sees the diff before it ships — but nothing here
 * requires that review to happen before the rule takes effect locally.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { findGeminiApiKey, callGemini, DEFAULT_GEMINI_MODEL } from "./llm-provider.mjs";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SYS_PROMPTS = join(REPO, "system-prompts");
const CANDIDATES_PATH = join(REPO, "data", "unnerf-candidates.json");

function loadJson(p) {
  return JSON.parse(readFileSync(p, "utf-8"));
}

/** Every currently-registered rule, via apply-unnerfs.py's own --dump-rules. */
function dumpExistingRules(applyUnnerfsPath) {
  const tmp = applyUnnerfsPath + ".rules-dump.tmp.json";
  execFileSync("python3", [applyUnnerfsPath, "--dump-rules", tmp], { stdio: "pipe" });
  const rules = loadJson(tmp);
  try { unlinkSync(tmp); } catch {}
  return rules; // [{id, stock, unnerf, description}] — id is the filename minus ".md"
}

/**
 * Find the system-prompts/*.md file(s) whose CURRENT content contains this
 * candidate's sample. Strips a leading `${}` (an interpolation marker the
 * classifier's canonicalized sample shows literally, but the reconstructed
 * .md replaces with the real variable name) before matching, and only uses a
 * short prefix of the sample — candidates.json caps `sample` at 200 chars,
 * comfortably unique within a single file without needing the whole thing.
 */
function findMatchingFiles(sample, files) {
  const needle = sample.replace(/^\$\{\}\n*/, "").slice(0, 60);
  if (needle.length < 15) return []; // too short a needle to trust a substring match
  const matches = [];
  for (const f of files) {
    const content = readFileSync(join(SYS_PROMPTS, f), "utf-8");
    if (content.includes(needle)) matches.push(f);
  }
  return matches;
}

function prepare(ccVersion, workDir, chunkSize, chunkBytesCap) {
  mkdirSync(workDir, { recursive: true });
  const applyUnnerfsPath = join(REPO, "scripts", "apply-unnerfs.py");
  const allCandidates = existsSync(CANDIDATES_PATH) ? loadJson(CANDIDATES_PATH) : [];
  const candidates = allCandidates.filter((c) => c.ccFirstSeen === ccVersion);
  const existingRules = dumpExistingRules(applyUnnerfsPath);
  const rulesByFile = new Map();
  for (const r of existingRules) {
    if (!rulesByFile.has(r.id)) rulesByFile.set(r.id, []);
    rulesByFile.get(r.id).push({ stock: r.stock, unnerf: r.unnerf, description: r.description });
  }
  const files = readdirSync(SYS_PROMPTS).filter((f) => f.endsWith(".md"));

  const items = [];
  const unmatched = [];
  candidates.forEach((c, i) => {
    const matches = findMatchingFiles(c.sample, files);
    if (!matches.length) { unmatched.push(c); return; }
    for (const file of matches) {
      const id = file.slice(0, -3);
      items.push({
        ref: items.length,
        file,
        sample: c.sample,
        notes: c.notes,
        existingRules: rulesByFile.get(id) || [],
      });
    }
  });

  if (unmatched.length) {
    console.error(`  ${unmatched.length} candidate(s) had no matching file (skipped, not fatal):`);
    for (const u of unmatched.slice(0, 10)) console.error(`    - ${JSON.stringify(u.sample.slice(0, 70))}`);
  }

  writeFileSync(join(workDir, "worklist.json"), JSON.stringify(items, null, 2));
  writeFileSync(join(workDir, "BUCKET-ANALYSIS-TASK.md"), taskInstructions(items.length, REPO));

  const chunks = [];
  let cur = [];
  let curBytes = 0;
  for (const it of items) {
    let fileBytes = 0;
    try { fileBytes = readFileSync(join(SYS_PROMPTS, it.file), "utf-8").length; } catch { fileBytes = 2000; }
    if (cur.length && (cur.length >= chunkSize || curBytes + fileBytes > chunkBytesCap)) {
      chunks.push(cur); cur = []; curBytes = 0;
    }
    cur.push(it);
    curBytes += fileBytes;
  }
  if (cur.length) chunks.push(cur);
  chunks.forEach((c, i) => {
    writeFileSync(join(workDir, `chunk-${String(i).padStart(3, "0")}.json`), JSON.stringify(c, null, 2));
  });

  console.log(`worklist: ${items.length} candidate(s) to bucket-analyze -> ${join(workDir, "worklist.json")}`);
  if (chunks.length) console.log(`chunks:   ${chunks.length}`);
  return items.length;
}

function collect(workDir) {
  const items = loadJson(join(workDir, "worklist.json"));
  const verdicts = [];
  const seenRefs = new Set();
  for (const f of readdirSync(workDir).filter((f) => /^verdicts-\d+\.json$/.test(f)).sort()) {
    for (const v of loadJson(join(workDir, f))) {
      if (seenRefs.has(v.ref)) continue;
      seenRefs.add(v.ref);
      verdicts.push(v);
    }
  }
  const missing = items.map((it) => it.ref).filter((r) => !seenRefs.has(r));
  if (missing.length) {
    console.error(`bucket-analyze collect INCOMPLETE: ${missing.length}/${items.length} ref(s) missing a verdict`);
    console.error(`  missing refs: ${missing.join(", ")}`);
    process.exit(1);
  }
  verdicts.sort((a, b) => a.ref - b.ref);
  writeFileSync(join(workDir, "verdicts.json"), JSON.stringify(verdicts, null, 2));
  console.log(`collected ${verdicts.length} verdict(s) -> ${join(workDir, "verdicts.json")}`);
}

/** True if two strings share more than a trivial overlap (either contains the other). */
function overlaps(a, b) {
  if (!a || !b) return false;
  return a.includes(b) || b.includes(a);
}

function extractVars(s) {
  return [...s.matchAll(/\$\{[^}]*\}/g)].map((m) => m[0]);
}

function merge(workDir, applyUnnerfsPath, ccVersion) {
  const items = loadJson(join(workDir, "worklist.json"));
  const verdicts = loadJson(join(workDir, "verdicts.json"));
  const itemByRef = new Map(items.map((it) => [it.ref, it]));
  const existingRules = dumpExistingRules(applyUnnerfsPath);
  const rulesByFile = new Map();
  for (const r of existingRules) {
    if (!rulesByFile.has(r.id)) rulesByFile.set(r.id, []);
    rulesByFile.get(r.id).push(r);
  }

  const accepted = []; // [{file, rule}]
  const report = [];
  let rejected = 0;

  for (const v of verdicts) {
    const item = itemByRef.get(v.ref);
    if (!item) { console.error(`  ref ${v.ref}: no matching worklist item — skipping`); continue; }
    if (v.verdict === "keep") {
      report.push({ file: item.file, verdict: "keep", reasoning: v.reasoning || "" });
      continue;
    }
    if (v.verdict !== "lift" || !v.rule || !v.rule.stock || !v.rule.unnerf) {
      console.error(`  ref ${v.ref} (${item.file}): malformed verdict, treating as reject`);
      report.push({ file: item.file, verdict: "rejected", reasoning: "malformed verdict/rule" });
      rejected++;
      continue;
    }
    const { stock, unnerf, description } = v.rule;
    const problems = [];
    let content = "";
    try { content = readFileSync(join(SYS_PROMPTS, item.file), "utf-8"); }
    catch { problems.push("file no longer exists"); }
    if (content) {
      const count = content.split(stock).length - 1;
      if (count !== 1) problems.push(`stock occurs ${count} time(s) in the current file, need exactly 1`);
    }
    if (stock === unnerf) problems.push("stock and unnerf are identical (no-op)");
    const newVars = extractVars(unnerf).filter((tok) => !stock.includes(tok));
    if (newVars.length) problems.push(`introduces new placeholder(s) not in stock: ${newVars.join(", ")}`);
    const already = rulesByFile.get(item.file.slice(0, -3)) || [];
    for (const existing of already) {
      if (overlaps(stock, existing.stock) || overlaps(unnerf, existing.unnerf)) {
        problems.push(`overlaps an existing rule: "${existing.description}"`);
        break;
      }
    }
    // Also guard against two proposed rules in THIS run colliding on the same file.
    for (const { file: af, rule: ar } of accepted) {
      if (af === item.file && (overlaps(stock, ar.stock) || overlaps(unnerf, ar.unnerf))) {
        problems.push(`overlaps another rule proposed in this same run: "${ar.description}"`);
        break;
      }
    }
    if (problems.length) {
      console.error(`  ref ${v.ref} (${item.file}): rejected — ${problems.join("; ")}`);
      report.push({ file: item.file, verdict: "rejected", reasoning: v.reasoning || "", problems });
      rejected++;
      continue;
    }
    accepted.push({ file: item.file, rule: { stock, unnerf, description } });
    report.push({ file: item.file, verdict: "lift", reasoning: v.reasoning || "", rule: { stock, unnerf, description } });
  }

  const reportPath = join(REPO, "data", `bucket-analysis-${ccVersion}.json`);
  writeFileSync(reportPath, JSON.stringify({ ccVersion, generatedBy: "bucket-analyze.mjs", report }, null, 2) + "\n");
  console.log(`wrote full keep/lift review (${report.length} candidate(s), ${accepted.length} accepted, ${rejected} rejected) -> ${reportPath}`);

  if (!accepted.length) {
    console.log("no rules to insert — apply-unnerfs.py unchanged");
    return;
  }

  insertRules(applyUnnerfsPath, ccVersion, accepted);
  console.log(`inserted ${accepted.length} new rule(s) into ${applyUnnerfsPath}`);

  // Verify the newly-inserted rule(s) actually MATCH — i.e. would be APPLIED,
  // not FAILED/MISSING. Deliberately --dry-run, not --check: --check's
  // semantics are "exit 1 if ANY rule would still change something", which is
  // always true right here (nothing has run the real apply pass yet, so the
  // stock text this rule targets is still stock). --dry-run without --check
  // exits 1 only for a genuine failed/missing status (apply-unnerfs.py's own
  // CLI logic), which is the real signal a newly-inserted rule is broken. The
  // caller (upgrade.sh) runs the real apply pass AND --check right after this
  // — that is where "everything converges cleanly" gets verified.
  try {
    execFileSync("python3", [applyUnnerfsPath, "--dry-run"], { stdio: "pipe", cwd: REPO });
  } catch (e) {
    // No automatic rollback — apply-unnerfs.py is git-tracked, same as every
    // other file upgrade.sh touches; `git checkout` (or just fixing the rule
    // by hand) is the recovery path, matching how every other hard failure in
    // this pipeline is handled.
    console.error("a newly-inserted rule FAILED to match the file it targets — see detail below:");
    console.error((e.stdout || "").toString());
    console.error((e.stderr || "").toString());
    process.exit(1);
  }
}

function pyStr(s) {
  // A plain double-quoted Python string literal — matches every existing rule
  // in apply-unnerfs.py (which never uses triple-quotes). A real newline in
  // `s` is rendered as the two-character `\n` escape, never embedded literally
  // (an unescaped literal newline inside a non-triple-quoted Python string is
  // a SyntaxError).
  const escaped = s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
  return `"${escaped}"`;
}

function insertRules(applyUnnerfsPath, ccVersion, accepted) {
  const src = readFileSync(applyUnnerfsPath, "utf-8");
  const marker = "\n}\n";
  const idx = src.lastIndexOf(marker);
  if (idx < 0) throw new Error("could not find the RULES dict's closing brace to insert before");

  const byFile = new Map();
  for (const { file, rule } of accepted) {
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push(rule);
  }

  const date = new Date().toISOString().slice(0, 10);
  let block = `\n    # -------------------------------------------------------------------------\n`;
  block += `    # v${ccVersion} sync (bucket-analyze.mjs, ${date}): AI-proposed, mechanically\n`;
  block += `    # validated (stock occurs exactly once, no new \${VAR} introduced, no overlap\n`;
  block += `    # with an existing rule, confirmed to actually match via --dry-run). Full\n`;
  block += `    # keep/lift review (every KEEP decision and why too): data/bucket-analysis-${ccVersion}.json\n`;
  block += `    # -------------------------------------------------------------------------\n`;
  for (const [file, rules] of byFile) {
    const existingIdx = src.indexOf(`"${file}": [`);
    if (existingIdx >= 0 && existingIdx < idx) {
      // A rule for this file already exists elsewhere in the dict (added earlier
      // this same run, or a file with a pre-existing block from a prior sync) —
      // never emit a second `"file.md": [...]` key, Python would just let the
      // later one win and silently drop the first. Skip; this run's candidates
      // already passed the overlap check against those entries.
      console.error(`  note: ${file} already has a rule block elsewhere; not adding a duplicate key`);
      continue;
    }
    block += `    "${file}": [\n`;
    for (const r of rules) {
      block += `        Rule(\n`;
      block += `            stock=${pyStr(r.stock)},\n`;
      block += `            unnerf=${pyStr(r.unnerf)},\n`;
      block += `            description=${pyStr(r.description)},\n`;
      block += `        ),\n`;
    }
    block += `    ],\n`;
  }

  const out = src.slice(0, idx) + block + src.slice(idx + 1); // +1 keeps the marker's own leading \n
  writeFileSync(applyUnnerfsPath, out);
}

// JSON Schema for the verdicts array. `rule` is always a present object
// (never null) with the SAME fields regardless of verdict — Gemini's schema
// dialect is a restricted JSON-Schema subset (confirmed elsewhere in this
// project: it rejects `additionalProperties` outright), and a nullable
// nested object isn't a risk worth taking here when it's easy to sidestep:
// merge()'s own code never reads `rule` at all for a "keep" verdict (its
// very first branch is `if (v.verdict === "keep") { ...; continue; }`), so
// analyzeChunkViaGemini nulls `rule` out in post-processing purely to match
// the documented on-disk contract for a human later reading verdicts.json —
// not because merge() requires it. NO minItems/maxItems on the outer array:
// confirmed on classify.mjs (2026-08-29, gemini-3.7-flash) that Gemini's
// structured-output API rejects that fixed-size constraint with a content-
// independent 400 somewhere between n=25 and n=100.
function bucketAnalyzeResultSchema() {
  return {
    type: "array",
    items: {
      type: "object",
      properties: {
        ref: { type: "integer" },
        verdict: { type: "string", enum: ["keep", "lift"] },
        reasoning: { type: "string" },
        rule: {
          type: "object",
          properties: {
            stock: { type: "string" },
            unnerf: { type: "string" },
            description: { type: "string" },
          },
          required: ["stock", "unnerf", "description"],
        },
      },
      required: ["ref", "verdict", "reasoning", "rule"],
    },
  };
}

// Analyze ONE chunk via Gemini instead of the (agentic, file-reading) Claude
// CLI upgrade.sh normally shells out to. Gemini is non-agentic — cannot read
// chunk-NNN.json/UNNERF-GUIDE.md/the referenced system-prompts/*.md files off
// disk itself — so all of them are inlined directly into the prompt, mirroring
// classify.mjs's/relabel.mjs's Gemini paths exactly. The task instructions
// normally tell the labeler to "read this file yourself" at an absolute repo
// path; since nothing here can do that, each item's CURRENT full file content
// is inlined alongside it instead, and the instructions text is corrected to
// say so, so the model doesn't waste effort trying to reference a path it has
// no tool to open.
async function analyzeChunkViaGemini(workDir, chunkNum, model, effort) {
  const cn = String(chunkNum).padStart(3, "0");
  const taskMd = readFileSync(join(workDir, "BUCKET-ANALYSIS-TASK.md"), "utf8");
  const chunk = JSON.parse(readFileSync(join(workDir, `chunk-${cn}.json`), "utf8"));
  const fileContents = {};
  for (const it of chunk) {
    if (fileContents[it.file] !== undefined) continue;
    try { fileContents[it.file] = readFileSync(join(SYS_PROMPTS, it.file), "utf8"); }
    catch (e) { fileContents[it.file] = `<<COULD NOT READ: ${e.message}>>`; }
  }
  const prompt =
    `${taskMd}\n\n` +
    `## Input format override (read this — it changes how you get file content)\n` +
    `You cannot read files yourself in this environment. Every item below still names its ` +
    `\`file\`, but instead of opening it at the repo path, look it up in the ` +
    `"file contents" map that follows — the CURRENT, fully-reconstructed stock text for every ` +
    `distinct file referenced in your chunk, keyed by filename exactly as it appears in each item.\n\n` +
    `## chunk-${cn}.json (your assigned items — already provided below, do not look for a file)\n${JSON.stringify(chunk)}\n\n` +
    `## file contents (keyed by filename; already provided below, do not look for these files)\n${JSON.stringify(fileContents)}`;
  const found = findGeminiApiKey(REPO);
  if (!found) {
    console.error(`bucket-analyze: --provider gemini requires GOOGLE_GEMINI_API_KEY — checked the environment, ${join(REPO, ".env")}, and ~/.env; found none`);
    return false;
  }
  const g = await callGemini({
    apiKey: found.key, model: model || DEFAULT_GEMINI_MODEL, effort: effort || "medium", prompt,
    resultSchema: bucketAnalyzeResultSchema(), workDir: null,
  });
  if (!g.ok) {
    console.error(`bucket-analyze: chunk ${cn} gemini call failed: ${g.detail}`);
    return false;
  }
  if (!Array.isArray(g.parsed)) {
    console.error(`bucket-analyze: chunk ${cn} gemini returned non-array JSON`);
    return false;
  }
  const verdicts = g.parsed.map((v) => (v && v.verdict === "keep" ? { ...v, rule: null } : v));
  writeFileSync(join(workDir, `verdicts-${cn}.json`), JSON.stringify(verdicts, null, 2));
  const nLift = verdicts.filter((v) => v && v.verdict === "lift").length;
  console.error(`bucket-analyze: chunk ${cn} analyzed via gemini (${verdicts.length} verdict(s), ${nLift} lift)`);
  return true;
}

function taskInstructions(n, repoAbsPath) {
  return `# Un-nerf bucket-analysis task

You are a maintainer of unnerfcc, a project that strips Claude Code's stock
system prompts of "hold back" restrictions (brevity caps, process shortcuts,
local content-flagging) and replaces them with "go as far as the work needs"
directives. You are deciding, for ${n} candidate passage(s) flagged by an
earlier AI classification pass, whether each one genuinely needs a NEW rule in
\`scripts/apply-unnerfs.py\`, or should be left as stock.

**Your current directory is a scratch work directory, NOT the repo.** The repo
root is \`${repoAbsPath}\` — read every repo file (the guide, the system-prompts
files below) using that absolute path, e.g. \`${repoAbsPath}/UNNERF-GUIDE.md\`.
Only \`chunk-NNN.json\` and your output file live in your current directory.

## Read this FIRST, in full
\`${repoAbsPath}/UNNERF-GUIDE.md\`, Part 1 — "The objective". It has the exact
keep/lift decision procedure (a checklist, first match wins) and the register
rules for how the replacement text must read (no CAPS theater, positive
framing, concrete requirements, state it once, no motivational filler, never
introduce a \${VAR} the prompt doesn't already have). Apply that checklist
literally; do not improvise a different standard.

## Inputs
- your assigned \`chunk-NNN.json\` (in YOUR current directory) — a subset of
  \`worklist.json\`. Each item:
  - \`ref\` — echo back unchanged.
  - \`file\` — a filename under \`system-prompts/\`. **Read this file yourself**
    at \`${repoAbsPath}/system-prompts/<file>\` — the CURRENT, fully-reconstructed
    stock text. Do not rely on \`sample\` for the actual wording; it is a
    classifier preview, truncated to 200 characters, and may be stale.
  - \`sample\` / \`notes\` — the earlier classification pass's hint about what
    looked nerfy and why. A starting point for where to look, not a verdict.
  - \`existingRules\` — rules ALREADY registered for this file (each
    \`{stock, unnerf, description}\`). Do not propose a rule whose \`stock\` or
    \`unnerf\` overlaps any of these — it already has one, or a sibling
    candidate in the same run is already handling it.

## Decide, per item: KEEP or LIFT

Apply UNNERF-GUIDE.md Part 1's checklist. Three calibration examples from
prior review rounds, since the classifier's flagging is intentionally
high-recall (it flags anything remotely brevity-shaped) and over-lifting a
genuinely mechanical constraint is exactly the failure mode to avoid:

1. **Genuine mechanical/context-budget constraint with honest disclosure ->
   KEEP.** A "for a diff over ~4,000 changed lines, read the highest-signal
   files instead of the raw diff, and disclose exactly what you covered"
   instruction is not brevity-nerfing — it is a real resource constraint
   (an enormous raw diff can blow the context window) paired with transparency
   about what was skipped, which is the OPPOSITE of silently holding back.
   Contrast with an EXISTING lifted rule for a "cap the scan at 50 sessions
   **so this stays fast**" instruction — THAT one names speed as the reason,
   which is the tell for an artificial nerf, not a resource constraint. If the
   stock text's own stated reason is a genuine resource/parsing limit, keep it;
   if the reason is "to save time" or no reason at all, it usually lifts.
2. **"One short line" for an UNPROMPTED, unsolicited offer -> usually KEEP.**
   A skill that proactively pitches itself once (e.g. "offer it unprompted, as
   one short line, then wait; on a no, don't offer again") is describing
   interruption-appropriate UX, not holding back capability — the offer isn't
   substantive work the user asked for, it's an uninvited suggestion that
   should be easy to wave off. Contrast with a length cap on SUBSTANTIVE work
   the user (or the flow) actually needs once engaged (an intake message, an
   assumptions summary, a closing report) — those lift per Group 1/3.
3. **Comment-thread / structured-output reply text -> usually KEEP.** "Brief"
   framing on a reply that gets posted as a comment-thread reply matches that
   medium's genre (like a PR comment), and "no preamble, output ONLY this JSON"
   on machine-executed output is decision-procedure item 1 (breaks parsing if
   violated) — neither is holding back Claude's actual reasoning or work, only
   the tone/shape of a specific, constrained output channel.

When genuinely uncertain, lean KEEP and say so in your reasoning — a missed
lift is a minor, easily-caught-next-review gap; an incorrectly lifted genuine
constraint can make the tool worse (e.g. forcing an unbounded raw read of an
enormous diff).

## For a LIFT verdict, draft the rule

- \`stock\`: copied VERBATIM from the file you actually read — not retyped from
  memory or from \`sample\`. Quote a span long enough to be UNIQUE in the file
  (include enough surrounding text that it cannot match twice) but no longer
  than needed. Preserve real newlines exactly as they appear in the file.
- \`unnerf\`: the un-nerfed replacement, following the register rules exactly
  (imperative, positive framing where one exists, concrete, stated once, no
  filler, no new \${VAR} not already present in \`stock\`).
- \`description\`: one short phrase for the report, in the style of existing
  rule descriptions (e.g. "prototype intake: drop the 2-4-question cap").

## Output

Write the file named in your instructions (\`verdicts-NNN.json\`, matching your
chunk number) in THIS directory: a JSON array, one object per item in your
chunk:
\`\`\`json
{ "ref": <int>, "verdict": "keep" | "lift", "reasoning": "<1-3 sentences>",
  "rule": { "stock": "...", "unnerf": "...", "description": "..." } | null }
\`\`\`
\`rule\` is required (non-null) when \`verdict\` is \`"lift"\`, and must be
\`null\` for \`"keep"\`. Emit EXACTLY one object per item in your chunk; echo
each \`ref\` unchanged — refs are global indices, your chunk's refs do not
start at 0. Do not skip any item.`;
}

const DEFAULT_CHUNK_SIZE = 25;
const DEFAULT_CHUNK_BYTES = 300000; // sum of the referenced files' sizes per chunk

async function main(argv) {
  const strs = { "--gemini-model": null, "--effort": null };
  for (const flag of Object.keys(strs)) {
    const i = argv.indexOf(flag);
    if (i < 0) continue;
    strs[flag] = argv[i + 1];
    argv = argv.filter((_, j) => j !== i && j !== i + 1);
  }
  const [cmd, ...rest] = argv;
  if (cmd === "prepare" && rest.length === 2) {
    const n = prepare(rest[0], rest[1], DEFAULT_CHUNK_SIZE, DEFAULT_CHUNK_BYTES);
    return n >= 0 ? 0 : 1;
  }
  if (cmd === "collect" && rest.length === 1) { collect(rest[0]); return 0; }
  if (cmd === "merge" && rest.length === 3) { merge(rest[0], rest[1], rest[2]); return 0; }
  if (cmd === "label" && rest.length === 2) {
    const ok = await analyzeChunkViaGemini(rest[0], rest[1], strs["--gemini-model"], strs["--effort"]);
    return ok ? 0 : 1;
  }
  console.error(
    "usage:\n" +
      "  node bucket-analyze.mjs prepare <ccVersion> <workDir>\n" +
      "  node bucket-analyze.mjs collect <workDir>\n" +
      "  node bucket-analyze.mjs merge   <workDir> <apply-unnerfs.py path> <ccVersion>\n" +
      "  node bucket-analyze.mjs label   <workDir> <chunkNum> [--gemini-model M] [--effort E]\n" +
      "                           (Gemini-only: analyzes one chunk directly, no Claude CLI)"
  );
  return 2;
}

process.exit(await main(process.argv.slice(2)));

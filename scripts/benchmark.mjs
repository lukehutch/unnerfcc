#!/usr/bin/env node
/**
 * benchmark.mjs — measure the un-nerf's effect on real coding accuracy.
 *
 * Runs the SWE-bench harness at https://github.com/jimmc414/claudecode_gemini_and_codex_swebench
 * against TWO binaries of the SAME Claude Code version — the STOCK release and
 * the just-PATCHED (un-nerfed) build — and plots the evaluation-accuracy
 * comparison as a bar chart committed into README.md.
 *
 * WHY IT'S A FAIR TEST
 * --------------------
 *   - Same CC version for both bars → the ONLY variable is the un-nerf.
 *   - Each binary runs with its OWN defaults (no `--model` is passed), so the
 *     patched build's lifted effort/model defaults AND prompt un-nerfs both count
 *     — the full effect of the patch, not just prompts.
 *   - Every `claude` the harness spawns runs under a FRESH CLAUDE_CONFIG_DIR
 *     (only the OAuth credentials are copied in) so the maintainer's
 *     ~/.claude/settings.json — which pins effortLevel, thinking tokens, etc. —
 *     CANNOT leak in and mask the comparison. Defaults, fresh session, authed.
 *
 * The harness hardcodes `claude` from PATH (utils/claude_interface.py), so each
 * binary is selected via a PATH-shim `claude` wrapper that also exports the
 * fresh config dir before exec-ing the chosen binary.
 *
 * COST / PREREQS — this is HEAVY and OPT-IN (upgrade.sh --benchmark).
 *   - Docker running + ~50GB free disk (SWE-bench eval builds per-repo images).
 *   - Python 3, git. A venv + pip install is cached under data/benchmark/.
 *   - n=10 ("quick") is ~1-2h PER binary and STATISTICALLY NOISY: each instance
 *     is 10 points, so a few-percent real effect is under the noise floor and
 *     the patched bar can read lower by chance. The chart is stamped with n and
 *     a caveat. For a trustworthy delta use a larger n (slower).
 *
 * USAGE
 *   node scripts/benchmark.mjs <stockBin> <patchedBin> <version> [n=10] [--no-eval]
 *
 * Never throws fatally to its caller: on a missing prereq it prints why and
 * exits 0 so a --benchmark upgrade is never failed by the benchmark step.
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync, chmodSync, readdirSync } from "node:fs";
import { spawnSync, spawn } from "node:child_process";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(SCRIPT_DIR, "..");
const CACHE = join(REPO, "data", "benchmark");            // gitignored working area
const REPO_DIR = join(CACHE, "harness");                   // the cloned benchmark repo
const VENV = join(CACHE, "venv");
const BIN_DIR = join(CACHE, "bin");                        // stable copies of the two binaries
const HARNESS_URL = "https://github.com/jimmc414/claudecode_gemini_and_codex_swebench";
const CHART = join(REPO, "docs", "benchmark.svg");
const README = join(REPO, "README.md");
const MARK_START = "<!-- BENCHMARK:START -->";
const MARK_END = "<!-- BENCHMARK:END -->";
// The harness hardcodes a 600s per-instance generation timeout, but the
// max-effort PATCHED build routinely runs ~500-650s/instance and gets cut off —
// biasing its accuracy (empty patches) AND the runtime we report. Raise it so
// both builds finish naturally and the timings are real. (Generation only — the
// Docker eval keeps its own --timeout.)
const GEN_TIMEOUT = parseInt(process.env.BENCH_GEN_TIMEOUT || "1200", 10);
// Failed-generation retries: an instance whose patch comes back EMPTY (a
// transient rate-limit / overload / crash — NOT a real "couldn't solve it") is
// re-run up to RETRIES more times, with RETRY_DELAY s between, so infra hiccups
// don't corrupt the accuracy number. A patch that stays empty after retries is
// counted as a genuine failure.
const RETRIES = parseInt(process.env.BENCH_RETRIES || "2", 10);
const RETRY_DELAY = parseInt(process.env.BENCH_RETRY_DELAY || "60", 10);
const fmtDur = (s) => (s == null ? "n/a" : s < 60 ? `${Math.round(s)}s` : `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`);
const pad2 = (n) => String(n).padStart(2, "0");
function tstamp() { const d = new Date(); return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}_${pad2(d.getHours())}${pad2(d.getMinutes())}${pad2(d.getSeconds())}`; }

const c = { cyan: "\x1b[1;36m", green: "\x1b[1;32m", yellow: "\x1b[1;33m", red: "\x1b[1;31m", off: "\x1b[0m" };
const log = (m) => console.log(`${c.cyan}==>${c.off} ${m}`);
const ok = (m) => console.log(`${c.green}  ✓${c.off} ${m}`);
const warn = (m) => console.error(`${c.yellow}  !${c.off} ${m}`);
// Non-fatal skip: print why and exit 0 (caller must not be failed by us).
const skip = (m) => { console.error(`${c.yellow}benchmark skipped:${c.off} ${m}`); process.exit(0); };

function sh(cmd, args, opts = {}) {
  return spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024, ...opts });
}
function have(cmd) { return sh("bash", ["-lc", `command -v ${cmd}`]).status === 0; }

// Async spawn — needed to run the two benchmark subprocesses CONCURRENTLY
// (spawnSync would serialize them). Resolves {status, stdout, stderr}.
function shAsync(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { ...opts });
    let stdout = "", stderr = "";
    p.stdout?.on("data", (d) => (stdout += d));
    p.stderr?.on("data", (d) => (stderr += d));
    p.on("error", (e) => resolve({ status: -1, stdout, stderr: stderr + String(e) }));
    p.on("close", (status) => resolve({ status, stdout, stderr }));
  });
}

// --- Docker cleanup (runs on EVERY exit once the eval has touched Docker) ----
// SWE-bench builds base/env/instance images (sweb.*) and eval containers; left
// alone they accumulate tens of GB. Clean them on clean AND erroneous exit. Uses
// only sync calls so it's safe inside a process 'exit' handler (which fires on
// normal completion, process.exit(), and after an uncaught exception).
let dockerUsed = false;
function cleanupDocker() {
  if (!dockerUsed) return;
  dockerUsed = false; // guard against double-run
  try {
    process.stderr.write(`${c.cyan}==>${c.off} Cleaning up Docker (SWE-bench containers + images)\n`);
    sh("bash", ["-lc", "docker ps -aq --filter name=sweb.eval | xargs -r docker rm -f >/dev/null 2>&1"]);
    sh("bash", ["-lc", "docker images -q --filter=reference='sweb.*' | sort -u | xargs -r docker rmi -f >/dev/null 2>&1"]);
    sh("bash", ["-lc", "docker container prune -f >/dev/null 2>&1; docker builder prune -f >/dev/null 2>&1"]);
    // PRESERVE the small evidence (predictions/, results/, benchmark_scores.log)
    // before deleting the per-run harness copies — needed to diagnose asymmetries
    // like empty patches. The big instance checkouts ($CACHE/tmp) are pure scratch.
    for (const l of ["stock", "patched"]) {
      const src = join(CACHE, `harness-${l}`), dst = join(CACHE, `evidence-${l}`);
      rmSync(dst, { recursive: true, force: true });
      if (existsSync(src)) {
        mkdirSync(dst, { recursive: true });
        for (const keep of ["predictions", "results", "benchmark_scores.log"])
          if (existsSync(join(src, keep))) sh("cp", ["-a", join(src, keep), dst]);
      }
      rmSync(src, { recursive: true, force: true });
    }
    rmSync(join(CACHE, "tmp"), { recursive: true, force: true });
  } catch { /* best-effort */ }
}
process.on("exit", cleanupDocker);
process.on("SIGINT", () => process.exit(130));
process.on("SIGTERM", () => process.exit(143));
process.on("uncaughtException", (e) => { console.error(e); process.exit(1); });

// --- args -------------------------------------------------------------------
const argv = process.argv.slice(2);
const noEval = argv.includes("--no-eval");
// --mock=STOCK,PATCHED renders the chart + README from given eval %s WITHOUT
// running the harness — for previewing/testing the output shape only.
const mockArg = argv.find((a) => a.startsWith("--mock="))?.slice(7);
const [stockBin, patchedBin, version, nRaw] = argv.filter((a) => !a.startsWith("--"));

// Effort: BOTH binaries run at the SAME effort (default "high") so the
// comparison is apples-to-apples and isolates the PROMPT un-nerfs — the effort
// un-nerf (default→max) is deliberately NOT exercised here. Injected via the shim.
const EFFORT = (process.env.BENCH_EFFORT || "high").trim();
// Explicit instance set (one id per line, '#' comments ok): $BENCH_INSTANCES, or
// the committed default curated "hardest-for-Opus" list. When present, these
// exact instances run (not the first-N of the dataset) and n is their count.
const DEFAULT_INSTANCES = join(REPO, "data", "swebench-hardest-for-claude.txt");
const instancesFile = (process.env.BENCH_INSTANCES && existsSync(process.env.BENCH_INSTANCES))
  ? process.env.BENCH_INSTANCES : (existsSync(DEFAULT_INSTANCES) ? DEFAULT_INSTANCES : null);
let INSTANCE_IDS = [];
if (instancesFile) {
  INSTANCE_IDS = readFileSync(instancesFile, "utf8").split("\n").map((s) => s.trim()).filter((s) => s && !s.startsWith("#"));
}
const N = INSTANCE_IDS.length || parseInt(nRaw || "10", 10);
if (!version) {
  console.error("usage: node scripts/benchmark.mjs <stockBin> <patchedBin> <version> [n=10] [--no-eval] [--mock=S,P]");
  process.exit(2);
}
if (mockArg) {
  const [ms, mp] = mockArg.split(",").map(parseFloat);
  const stamp = new Date().toISOString().slice(0, 10);
  const rN = (p) => Math.round((p / 100) * N);
  const mock = { version, n: N, date: stamp, metric: "eval", sVal: ms, pVal: mp,
    stock: { resolved: rN(ms), tested: N, avgGen: 205 }, patched: { resolved: rN(mp), tested: N, avgGen: 560 } };
  mkdirSync(dirname(CHART), { recursive: true });
  writeFileSync(CHART, renderSvg(mock));
  updateReadme(mock);
  console.log(`[mock] wrote docs/benchmark.svg + README block for stock=${ms}% patched=${mp}% (mock timings)`);
  process.exit(0);
}
if (!stockBin || !patchedBin) {
  console.error("usage: node scripts/benchmark.mjs <stockBin> <patchedBin> <version> [n=10] [--no-eval] [--mock=S,P]");
  process.exit(2);
}
for (const [label, p] of [["stock", stockBin], ["patched", patchedBin]]) {
  if (!existsSync(p)) skip(`${label} binary not found: ${p}`);
}

// --- preconditions ----------------------------------------------------------
log(`Benchmark: stock vs patched Claude Code v${version} on SWE-bench-lite (n=${N})`);
if (!have("git")) skip("git not found");
if (!have("python3")) skip("python3 not found");
if (!have("docker")) skip("docker not found (SWE-bench evaluation needs it)");
if (sh("docker", ["ps"]).status !== 0) skip("docker daemon not reachable (`docker ps` failed) — start Docker and re-run");

// Disk guard: SWE-bench eval images are large and land in DOCKER's data-root
// (not this tmpfs workdir), so check THAT filesystem's free space.
const dockerRoot = (sh("docker", ["info", "--format", "{{.DockerRootDir}}"]).stdout || "").trim() || "/var/lib/docker";
const dfKb = parseInt((sh("bash", ["-lc", `df -Pk ${JSON.stringify(dockerRoot)} 2>/dev/null | awk 'NR==2{print $4}'`]).stdout || "0").trim(), 10) || 0;
const freeGb = Math.floor(dfKb / (1024 * 1024));
if (!noEval && freeGb > 0 && freeGb < 50) warn(`Docker data-root ${dockerRoot} has only ~${freeGb}GB free; SWE-bench eval wants ~50GB — it may fail. Free space or pass --no-eval (generation-only).`);
else if (!noEval) ok(`Docker data-root ${dockerRoot}: ~${freeGb}GB free`);

const creds = join(homedir(), ".claude", ".credentials.json");
if (!existsSync(creds)) skip(`no ~/.claude/.credentials.json — log in with 'claude' first so the benchmark can authenticate`);

mkdirSync(CACHE, { recursive: true });
mkdirSync(BIN_DIR, { recursive: true });
mkdirSync(dirname(CHART), { recursive: true });

// --- 1. check out the harness ----------------------------------------------
log("Checking out the SWE-bench harness");
if (!existsSync(join(REPO_DIR, ".git"))) {
  const r = sh("git", ["clone", "--depth", "1", "--recurse-submodules", HARNESS_URL, REPO_DIR], { stdio: "inherit" });
  if (r.status !== 0) skip("git clone of the harness failed (offline?)");
} else {
  sh("git", ["-C", REPO_DIR, "pull", "--ff-only"], { stdio: "inherit" });
  sh("git", ["-C", REPO_DIR, "submodule", "update", "--init", "--recursive"], { stdio: "inherit" });
}
if (!existsSync(join(REPO_DIR, "swe_bench.py"))) skip("harness checkout missing swe_bench.py");
ok(`harness at ${REPO_DIR}`);

// Raise the per-instance GENERATION timeout in the freshly-checked-out harness
// (re-applied every run since `git pull` restores the stock 600s). This is the
// `claude` subprocess timeout in utils/claude_interface.py — NOT the Docker eval
// timeout — so the max-effort patched build isn't guillotined mid-solve.
try {
  const ciPath = join(REPO_DIR, "utils", "claude_interface.py");
  // Restore the stock file first — a prior run left it patched, and
  // `git pull --ff-only` won't overwrite a locally-modified file — so the 600s
  // anchor is present to match. Idempotent across runs.
  sh("git", ["-C", REPO_DIR, "checkout", "--", "utils/claude_interface.py"]);
  const ci = readFileSync(ciPath, "utf8");
  const bumped = ci.replace(/timeout=600\b/, `timeout=${GEN_TIMEOUT}`);
  if (bumped !== ci) { writeFileSync(ciPath, bumped); ok(`raised per-instance generation timeout 600s → ${GEN_TIMEOUT}s`); }
  else warn("could not find the 600s generation timeout in claude_interface.py (harness changed?) — runs may be cut off at 600s");
} catch { warn("could not patch the harness generation timeout"); }

// Raise the harness's 2h TOTAL-inference cap (run_benchmark_with_eval.py kills
// the whole generation phase after 7200s regardless of per-instance progress) —
// a 50-instance high-effort run blows past it (each instance is minutes). Scale
// to N × the per-instance budget so a legit run is never prematurely killed.
try {
  const rbPath = join(REPO_DIR, "run_benchmark_with_eval.py");
  sh("git", ["-C", REPO_DIR, "checkout", "--", "run_benchmark_with_eval.py"]);
  const rb = readFileSync(rbPath, "utf8");
  const total = N * GEN_TIMEOUT + 1800;
  const bumped = rb.replace(/timeout=7200\b/g, `timeout=${total}`);
  if (bumped !== rb) { writeFileSync(rbPath, bumped); ok(`raised total-inference cap 7200s → ${total}s (~${(total / 3600).toFixed(1)}h) for ${N} instance(s)`); }
  else warn("could not find the 7200s total-inference cap in run_benchmark_with_eval.py — a long run may be cut off at 2h");
} catch { warn("could not patch the total-inference timeout"); }

// Teach the harness to run an EXPLICIT instance-id set (env BENCH_INSTANCE_IDS,
// comma-separated) instead of the first-N of the dataset — so we can benchmark a
// curated "hardest for Opus" list. Idempotent (restore from git, then patch).
if (INSTANCE_IDS.length) {
  try {
    const agentPath = join(REPO_DIR, "code_swe_agent.py");
    sh("git", ["-C", REPO_DIR, "checkout", "--", "code_swe_agent.py"]);
    const src = readFileSync(agentPath, "utf8");
    const anchor = "        if limit:\n            dataset = dataset.select(range(min(limit, len(dataset))))";
    const repl = "        _want = [i for i in os.environ.get(\"BENCH_INSTANCE_IDS\", \"\").split(\",\") if i]\n" +
                 "        if _want:\n" +
                 "            dataset = dataset.filter(lambda x: x[\"instance_id\"] in set(_want))\n" +
                 "        elif limit:\n" +
                 "            dataset = dataset.select(range(min(limit, len(dataset))))";
    if (src.includes(anchor)) { writeFileSync(agentPath, src.replace(anchor, repl)); ok(`harness will run ${INSTANCE_IDS.length} explicit instance(s)`); }
    else warn("could not find the dataset-limit anchor in code_swe_agent.py — falling back to first-N");
  } catch { warn("could not patch code_swe_agent.py for explicit instances"); }
}

// --- 2. python venv + deps --------------------------------------------------
log("Preparing Python venv (cached)");
const venvPy = join(VENV, "bin", "python");
if (!existsSync(venvPy)) {
  if (sh("python3", ["-m", "venv", VENV]).status !== 0) skip("could not create a python venv (is python3-venv installed?)");
}
// Install deps once; a sentinel avoids re-installing every run.
const depSentinel = join(VENV, ".deps-installed");
if (!existsSync(depSentinel)) {
  log("Installing harness requirements + swebench (first run — a few minutes)");
  sh(venvPy, ["-m", "pip", "install", "--upgrade", "pip", "-q"], { stdio: "inherit" });
  const req = join(REPO_DIR, "requirements.txt");
  const r = sh(venvPy, ["-m", "pip", "install", "-q", "-r", req], { stdio: "inherit" });
  if (r.status !== 0) skip("pip install of harness requirements failed");
  writeFileSync(depSentinel, new Date().toISOString());
}
ok("venv ready");

// --- helpers: per-binary config isolation + PATH shim -----------------------
function prepareBinary(label, srcBin) {
  // Stable copy so we don't depend on upgrade.sh's temp WORK dir persisting.
  const bin = join(BIN_DIR, `claude-${label}`);
  copyFileSync(srcBin, bin);
  chmodSync(bin, 0o755);

  // Fresh config dir → default settings + new session; copy ONLY the OAuth creds.
  const cfg = join(CACHE, "tmp", `cfg-${label}`);
  rmSync(cfg, { recursive: true, force: true });
  mkdirSync(cfg, { recursive: true });
  copyFileSync(creds, join(cfg, ".credentials.json"));
  chmodSync(join(cfg, ".credentials.json"), 0o600);

  // PATH shim: a `claude` that pins the fresh config dir then execs this binary.
  const shimDir = join(CACHE, "tmp", `shim-${label}`);
  mkdirSync(shimDir, { recursive: true });
  const shim = join(shimDir, "claude");
  writeFileSync(shim,
    `#!/usr/bin/env bash\n` +
    `# unnerfcc benchmark shim (${label}) — fresh config (defaults), authed, effort pinned.\n` +
    `export CLAUDE_CONFIG_DIR=${JSON.stringify(cfg)}\n` +
    // Pin BOTH builds to the same effort (--effort ${EFFORT}) so the comparison
    // isolates the prompt un-nerfs. Placed before "$@" so the harness's own flags
    // still apply; an explicit --effort here overrides the binary's default.
    `exec ${JSON.stringify(bin)} --effort ${JSON.stringify(EFFORT)} "$@"\n`);
  chmodSync(shim, 0o755);

  // Sanity: confirm the shim resolves to the intended version before a long run.
  const v = sh(shim, ["--version"], { env: { ...process.env, PATH: `${shimDir}:${process.env.PATH}` } });
  const got = (v.stdout || "").match(/\d+\.\d+\.\d+/)?.[0];
  if (got !== version) warn(`${label} shim reports v${got || "?"} (expected v${version})`);
  return { shimDir, cfg, bin };
}

// --- generation/eval plumbing (separated so failed generations can be retried
//     before a single final eval over the merged predictions) -----------------

// Predictions schema is {instance_id, model, prediction} (patch in `prediction`).
function readPreds(predFile) {
  const m = new Map();
  if (!predFile || !existsSync(predFile)) return m;
  for (const line of readFileSync(predFile, "utf8").trim().split("\n")) {
    if (!line) continue;
    try { const j = JSON.parse(line); m.set(j.instance_id, (j.prediction ?? j.model_patch ?? "").trim()); } catch { /* skip */ }
  }
  return m;
}
const emptyIdsOf = (map, ids) => ids.filter((id) => !map.get(id));
// Newest real predictions file (the harness names them predictions_<ts>.jsonl).
function newestPred(runRepo) {
  try {
    const dir = join(runRepo, "predictions");
    const fs = readdirSync(dir).filter((f) => /^predictions_\d{8}_\d{6}\.jsonl$/.test(f)).sort();
    return fs.length ? join(dir, fs[fs.length - 1]) : null;
  } catch { return null; }
}
// One generation pass over `ids` (no eval); returns {predFile, wall}.
async function runGen(label, runRepo, shimDir, tmp, ids, tag) {
  const env = { ...process.env, PATH: `${shimDir}:${process.env.PATH}`, TMPDIR: tmp, BENCH_INSTANCE_IDS: ids.join(",") };
  const args = ["swe_bench.py", "run", "--limit", String(ids.length), "--backend", "claude", "--no-eval"];
  const t0 = Date.now();
  const r = await shAsync(venvPy, args, { cwd: runRepo, env, stdio: ["ignore", "pipe", "pipe"] });
  writeFileSync(join(CACHE, `gen-${label}-${tag}-${version}.log`), (r.stdout || "") + "\n" + (r.stderr || ""));
  return { predFile: newestPred(runRepo), wall: (Date.now() - t0) / 1000 };
}
// Per-instance debug (status + failure reason) from the harness's results/*.json.
function collectDebug(label, runRepo, predMap, ids) {
  const byInst = {};
  try {
    const dir = join(runRepo, "results");
    for (const f of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
      try { const j = JSON.parse(readFileSync(join(dir, f), "utf8")); byInst[j.instance_id] = j; } catch { /* skip */ }
    }
  } catch { /* no results dir */ }
  const rows = ids.map((id) => {
    const patch = predMap.get(id) || "";
    const co = (byInst[id] || {}).claude_output || {};
    const blob = `${co.stderr || ""}\n${co.stdout || ""}`;
    let status = patch ? "ok" : "EMPTY";
    if (!patch) {
      if (/rate.?limit|\b429\b|overloaded|too many requests/i.test(blob)) status = "RATE_LIMIT";
      else if (/usage limit|quota|insufficient|balance|402\b/i.test(blob)) status = "USAGE_LIMIT";
      else if (typeof co.returncode === "number" && co.returncode !== 0) status = `EXIT_${co.returncode}`;
      else if ((co.stdout || "").length === 0) status = "NO_OUTPUT";
    }
    return { id, status, patchLen: patch.length, rc: co.returncode ?? null, stdoutLen: (co.stdout || "").length,
             errTail: status === "ok" ? "" : (co.stderr || "").trim().slice(-400) || (co.stdout || "").slice(-200) };
  });
  writeFileSync(join(CACHE, `debug-${label}-${version}.json`), JSON.stringify(rows, null, 2));
  return rows;
}

async function runOne(label, srcBin) {
  const { shimDir } = prepareBinary(label, srcBin);
  // FULL isolation for parallel runs: own TMPDIR (the harness clones each
  // instance to `${gettempdir()}/swe_bench_<instance>` and rmtree's it) and own
  // copy of the (888K) harness (predictions/results/scores are timestamp-named
  // and would collide across two concurrent runs).
  const tmp = join(CACHE, "tmp", `tmp-${label}`);
  mkdirSync(tmp, { recursive: true });
  const runRepo = join(CACHE, `harness-${label}`);
  rmSync(runRepo, { recursive: true, force: true });
  if (sh("cp", ["-a", REPO_DIR, runRepo]).status !== 0) { warn(`${label}: could not copy harness`); return { eval: null, gen: null }; }
  for (const d of ["predictions", "results", "evaluation_results", "logs"]) rmSync(join(runRepo, d), { recursive: true, force: true });
  rmSync(join(runRepo, "benchmark_scores.log"), { force: true });

  // --- generation, with retry of empty-patch instances ----------------------
  const g0 = await runGen(label, runRepo, shimDir, tmp, INSTANCE_IDS.length ? INSTANCE_IDS : [], "gen");
  const predMap = readPreds(g0.predFile);
  const ids = INSTANCE_IDS.length ? INSTANCE_IDS.slice() : [...predMap.keys()];
  let totalWall = g0.wall;
  let empties = emptyIdsOf(predMap, ids);
  const retryLog = [{ attempt: 0, ran: ids.length, empty: empties.length }];
  for (let r = 1; r <= RETRIES && empties.length; r++) {
    warn(`${label}: ${empties.length}/${ids.length} empty after attempt ${r - 1} — retry ${r}/${RETRIES} of just those: ${empties.join(", ")}`);
    if (RETRY_DELAY) await new Promise((res) => setTimeout(res, RETRY_DELAY * 1000));
    const gr = await runGen(label, runRepo, shimDir, tmp, empties, `retry${r}`);
    totalWall += gr.wall;
    const rm = readPreds(gr.predFile);
    for (const id of empties) { const p = rm.get(id); if (p) predMap.set(id, p); }
    const before = empties.length; empties = emptyIdsOf(predMap, ids);
    retryLog.push({ attempt: r, ran: before, recovered: before - empties.length, empty: empties.length });
  }

  // --- debug summary --------------------------------------------------------
  const dbg = collectDebug(label, runRepo, predMap, ids);
  const okCount = ids.length - empties.length;
  ok(`${label}: generation ${okCount}/${ids.length} patches${retryLog.length > 1 ? ` (after ${retryLog.length - 1} retr${retryLog.length - 1 === 1 ? "y" : "ies"})` : ""}`);
  for (const f of dbg.filter((d) => d.status !== "ok"))
    warn(`  ${label} still-empty ${f.id} [${f.status}] rc=${f.rc} stdout=${f.stdoutLen}b :: ${(f.errTail || "").replace(/\s+/g, " ").slice(0, 160)}`);

  // --- write merged predictions (harness-recognized name + schema) ----------
  const mergedName = `predictions_${tstamp()}.jsonl`;
  const mergedFile = join(runRepo, "predictions", mergedName);
  writeFileSync(mergedFile, ids.map((id) =>
    JSON.stringify({ instance_id: id, model: `claude-${label}`, prediction: predMap.get(id) || "" })).join("\n") + "\n");

  const genPct = ids.length ? (100 * okCount) / ids.length : null;
  const avgGen = ids.length ? totalWall / ids.length : null; // wall/instance incl. retries + per-instance clone
  const base = { gen: genPct, resolved: null, tested: ids.length, avgGen, debug: dbg, retryLog, stillEmpty: empties };

  if (noEval) { ok(`${label}: gen=${genPct?.toFixed(0)}% (eval skipped)  avg ${fmtDur(avgGen)}/inst`); return { ...base, eval: null }; }

  // --- single eval over the merged predictions ------------------------------
  const ev = await shAsync(venvPy, ["swe_bench.py", "eval", "--file", mergedName, "--dataset", "princeton-nlp/SWE-bench_Lite", "--max-workers", "4", "--force"],
    { cwd: runRepo, env: { ...process.env, TMPDIR: tmp }, stdio: ["ignore", "pipe", "pipe"] });
  const eout = (ev.stdout || "") + "\n" + (ev.stderr || "");
  writeFileSync(join(CACHE, `eval-${label}-${version}.log`), eout);
  // The eval subcommand's printed "Evaluation Score: X% (R/300)" divides by the
  // FULL dataset (300), so take the RESOLVED COUNT and divide by how many we
  // actually evaluated (N). Prefer the "Instances resolved: N" line; fall back
  // to the numerator of the (R/total) fraction.
  const rm = eout.match(/Instances resolved:\s*(\d+)/) || eout.match(/Evaluation Score:\s*[\d.]+%\s*\((\d+)\s*\//);
  const sc = { ...base };
  if (rm) { sc.resolved = +rm[1]; sc.eval = sc.tested ? (100 * sc.resolved) / sc.tested : null; }
  else { sc.eval = null; warn(`${label}: could not parse eval score — see data/benchmark/eval-${label}-${version}.log`); }
  ok(`${label}: eval=${sc.eval != null ? sc.eval.toFixed(0) : "n/a"}% (${sc.resolved ?? "?"}/${sc.tested}) gen=${genPct?.toFixed(0)}% avg ${fmtDur(avgGen)}/inst`);
  return sc;
}

// --- 3. run both IN PARALLEL (isolated config + temp dirs) ------------------
if (!noEval) dockerUsed = true; // eval touches Docker → clean up on exit
log(`Running stock + patched CONCURRENTLY (n=${N} each) at --effort ${EFFORT}${INSTANCE_IDS.length ? " on the curated hard-instance set" : ""} — isolated config + temp dir`);
const [stock, patched] = await Promise.all([runOne("stock", stockBin), runOne("patched", patchedBin)]);

// The headline metric is the evaluation score (issues actually fixed); fall
// back to generation score only if eval was skipped/failed for BOTH.
const metric = (stock.eval != null && patched.eval != null) ? "eval" : "gen";
const sVal = stock[metric], pVal = patched[metric];
const stamp = new Date().toISOString().slice(0, 10);
// Compact view for results.json — full per-instance debug stays in
// debug-<label>-<version>.json (heavy errTail strings don't belong here).
const compact = (s) => ({ eval: s.eval, gen: s.gen, resolved: s.resolved, tested: s.tested, avgGen: s.avgGen,
  retryLog: s.retryLog, stillEmpty: s.stillEmpty,
  failures: (s.debug || []).filter((d) => d.status !== "ok").map((d) => ({ id: d.id, status: d.status, rc: d.rc })) });
const results = { version, n: N, date: stamp, metric, effort: EFFORT, retries: RETRIES,
  stock: compact(stock), patched: compact(patched),
  dataset: INSTANCE_IDS.length ? "SWE-bench-lite (hardest-for-Claude subset)" : "SWE-bench-lite", instances: INSTANCE_IDS };
writeFileSync(join(CACHE, `results-${version}.json`), JSON.stringify(results, null, 2));

// A real (non --no-eval) run that produced NO eval score for a binary FAILED
// (generation crash / timeout) — its gen=0% must NOT clobber a good committed
// chart. Bail non-zero and leave README/docs untouched.
if (!noEval && (stock.eval == null || patched.eval == null)) {
  warn(`run FAILED to produce an evaluation score (stock eval=${stock.eval ?? "n/a"}, patched eval=${patched.eval ?? "n/a"}) — likely a generation crash or timeout. NOT touching the chart. See data/benchmark/run-*.log`);
  process.exit(1);
}
if (sVal == null || pVal == null) {
  warn("no comparable score for both binaries — not updating the README chart. See data/benchmark/*.log");
  process.exit(0);
}

// --- 4. render the chart + update README ------------------------------------
log("Rendering chart + updating README");
writeFileSync(CHART, renderSvg({ version, n: N, date: stamp, metric, sVal, pVal, stock, patched }));
updateReadme({ version, n: N, date: stamp, metric, sVal, pVal, stock, patched });
ok(`chart → docs/benchmark.svg ; README benchmark section updated (stock ${sVal}% → patched ${pVal}%)`);

// ---------------------------------------------------------------------------
function renderSvg({ version, n, date, metric, sVal, pVal, stock, patched }) {
  const W = 720, H = 448, padL = 64, padR = 32, padT = 84, padB = 100;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const yMax = Math.max(20, Math.ceil(Math.max(sVal, pVal) / 10) * 10 + 5);
  const y = (v) => padT + plotH - (v / yMax) * plotH;
  const barW = 120, gap = 120;
  const x0 = padL + (plotW - (barW * 2 + gap)) / 2;
  const bars = [
    { label: "stock", v: sVal, x: x0, fill: "#8a94a6" },
    { label: "patched", v: pVal, x: x0 + barW + gap, fill: "#2f9e6b" },
  ];
  const gridlines = [];
  for (let g = 0; g <= yMax; g += 5) {
    const gy = y(g);
    gridlines.push(`<line x1="${padL}" y1="${gy}" x2="${W - padR}" y2="${gy}" stroke="#e2e6ec" stroke-width="1"/>`);
    gridlines.push(`<text x="${padL - 10}" y="${gy + 4}" text-anchor="end" font-size="12" fill="#6b7280">${g}%</text>`);
  }
  const barsSvg = bars.map((b) => {
    const by = y(b.v), bh = padT + plotH - by;
    return `<rect x="${b.x}" y="${by}" width="${barW}" height="${bh}" rx="4" fill="${b.fill}"/>` +
      `<text x="${b.x + barW / 2}" y="${by - 10}" text-anchor="middle" font-size="20" font-weight="700" fill="#111827">${b.v.toFixed(1)}%</text>` +
      `<text x="${b.x + barW / 2}" y="${padT + plotH + 24}" text-anchor="middle" font-size="15" font-weight="600" fill="#374151">${b.label}</text>`;
  }).join("\n  ");
  const delta = (pVal - sVal).toFixed(1);
  const counts = (metric === "eval" && stock?.tested != null && patched?.tested != null)
    ? `stock ${stock.resolved}/${stock.tested} · patched ${patched.resolved}/${patched.tested} resolved`
    : "";
  const metricBase = metric === "eval" ? "evaluation accuracy (issues actually fixed)" : "generation rate (patches produced) — EVAL SKIPPED";
  const metricName = `${metricBase} · both at --effort ${EFFORT}${INSTANCE_IDS.length ? ` · ${INSTANCE_IDS.length} hardest-for-Claude cases` : ""}`;
  const rt = (stock?.avgGen != null && patched?.avgGen != null)
    ? `avg runtime/instance:  stock ${fmtDur(stock.avgGen)}  ·  patched ${fmtDur(patched.avgGen)}${stock.avgGen > 0 ? `  (${(patched.avgGen / stock.avgGen).toFixed(1)}× slower)` : ""}`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="#ffffff" stroke="#d1d5db" stroke-width="1"/>
  <text x="${W / 2}" y="34" text-anchor="middle" font-size="19" font-weight="700" fill="#111827">Un-nerf effect on SWE-bench-lite — Claude Code v${version}</text>
  <text x="${W / 2}" y="56" text-anchor="middle" font-size="13" fill="#6b7280">${metricName}</text>
  ${gridlines.join("\n  ")}
  ${barsSvg}
  <text x="${W / 2}" y="${H - 54}" text-anchor="middle" font-size="13" fill="#374151">stock ${sVal.toFixed(1)}%  →  patched ${pVal.toFixed(1)}%   (${delta >= 0 ? "+" : ""}${delta} pts)${counts ? "   ·   " + counts : ""}</text>
  ${rt ? `<text x="${W / 2}" y="${H - 33}" text-anchor="middle" font-size="12" fill="#6b7280">${rt}</text>` : ""}
  <text x="${W / 2}" y="${H - 14}" text-anchor="middle" font-size="11" fill="#9ca3af">n=${n} instances · ${date} · small n is noisy — treat as indicative, not significant</text>
</svg>`;
}

function updateReadme({ version, n, date, metric, sVal, pVal, stock, patched }) {
  const delta = (pVal - sVal).toFixed(1);
  const sCount = (metric === "eval" && stock?.tested != null) ? ` (${stock.resolved}/${stock.tested} resolved)` : "";
  const pCount = (metric === "eval" && patched?.tested != null) ? ` (${patched.resolved}/${patched.tested} resolved)` : "";
  const metricLabel = metric === "eval" ? "evaluation accuracy (issues actually resolved, Docker-verified)" : "generation rate only (Docker eval was skipped)";
  const sRt = stock?.avgGen != null ? fmtDur(stock.avgGen) : "n/a";
  const pRt = patched?.avgGen != null ? fmtDur(patched.avgGen) : "n/a";
  const slower = (stock?.avgGen > 0 && patched?.avgGen != null) ? ` (${(patched.avgGen / stock.avgGen).toFixed(1)}× slower)` : "";
  const block = `${MARK_START}
## Benchmark: does un-nerfing help?

Measured with the [SWE-bench harness](${HARNESS_URL}) — the **stock** vs the **un-nerfed** build of the *same* Claude Code version, so the only variable is the prompt patch. **Both builds run at \`--effort ${EFFORT}\`** (apples-to-apples: the effort un-nerf is *not* exercised here, so this isolates the prompt rewrites), each under a fresh \`CLAUDE_CONFIG_DIR\` so local \`settings.json\` can't skew it, and with no \`--model\` (each uses the version's default model).${INSTANCE_IDS.length ? ` Instances are the **${n} hardest-for-Claude** SWE-bench-lite cases — ranked by how few of the 24 Claude submissions on the [SWE-bench leaderboard](https://github.com/swe-bench/experiments) solved each, keeping only cases some model *did* solve (headroom; the ~35 nobody solved are excluded), across 12 repos — so the easy cases both builds already ace don't wash out the signal.` : ""}

![Un-nerf effect on SWE-bench-lite](docs/benchmark.svg)

| Build | ${metricLabel} | avg runtime / instance |
|---|---|---|
| Stock v${version} | **${sVal.toFixed(1)}%**${sCount} | ${sRt} |
| Un-nerfed v${version} | **${pVal.toFixed(1)}%**${pCount} (${delta >= 0 ? "+" : ""}${delta} pts) | ${pRt}${slower} |

${INSTANCE_IDS.length ? `${n} hardest-for-Claude` : "SWE-bench-lite"} instances, both at \`--effort ${EFFORT}\`, ${date}. Runtime is wall-clock per instance (repo clone + generation + retries; Docker eval excluded). Empty-patch generations (transient rate-limit / overload) are auto-retried up to ${RETRIES}× before counting as a failure${(stock?.stillEmpty?.length || patched?.stillEmpty?.length) ? ` — this run still had ${stock?.stillEmpty?.length || 0} stock / ${patched?.stillEmpty?.length || 0} patched left empty after retries` : ""}. **Caveat:** at n=${n} the accuracy is *indicative, not statistically significant* — each instance is worth ${(100 / n).toFixed(1)} points and the model is nondeterministic, so a few-point swing (either direction) is within the noise. Re-run larger with \`./upgrade.sh --benchmark=N\`.
${MARK_END}`;

  let md = readFileSync(README, "utf8");
  if (md.includes(MARK_START) && md.includes(MARK_END)) {
    md = md.replace(new RegExp(`${MARK_START}[\\s\\S]*?${MARK_END}`), block);
  } else {
    // Insert after the "Before / after" section if present, else before Credits.
    const anchor = "\n## Repo layout";
    md = md.includes(anchor) ? md.replace(anchor, `\n${block}\n${anchor}`) : md + `\n\n${block}\n`;
  }
  writeFileSync(README, md);
}

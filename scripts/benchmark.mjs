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

import { existsSync, mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync, chmodSync } from "node:fs";
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
const fmtDur = (s) => (s == null ? "n/a" : s < 60 ? `${Math.round(s)}s` : `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`);

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
    // drop the isolated per-run scratch: instance checkouts ($CACHE/tmp/tmp-*),
    // config/shim dirs, and the per-run harness copies.
    rmSync(join(CACHE, "tmp"), { recursive: true, force: true });
    for (const l of ["stock", "patched"]) rmSync(join(CACHE, `harness-${l}`), { recursive: true, force: true });
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
const N = parseInt(nRaw || "10", 10);
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
    `# unnerfcc benchmark shim (${label}) — default settings, fresh session, authed.\n` +
    `export CLAUDE_CONFIG_DIR=${JSON.stringify(cfg)}\n` +
    `exec ${JSON.stringify(bin)} "$@"\n`);
  chmodSync(shim, 0o755);

  // Sanity: confirm the shim resolves to the intended version before a long run.
  const v = sh(shim, ["--version"], { env: { ...process.env, PATH: `${shimDir}:${process.env.PATH}` } });
  const got = (v.stdout || "").match(/\d+\.\d+\.\d+/)?.[0];
  if (got !== version) warn(`${label} shim reports v${got || "?"} (expected v${version})`);
  return { shimDir, cfg, bin };
}

function parseScore(out) {
  const gen = out.match(/Generation Score:\s*([\d.]+)%/);
  // NB: the harness's printed "Evaluation Score" divides resolved instances by
  // the FULL SWE-bench-lite size (300), not by how many were actually run — so
  // it under-reports badly for n<300 (e.g. 1 resolved of 1 tested prints 0.33%).
  // Compute the true per-run accuracy from resolved/tested ourselves.
  const resolved = out.match(/Instances resolved:\s*(\d+)/);
  const tested = out.match(/Instances tested:\s*(\d+)/);
  let ev = null;
  if (resolved && tested && parseInt(tested[1], 10) > 0) {
    ev = (100 * parseInt(resolved[1], 10)) / parseInt(tested[1], 10);
  } else {
    const m = out.match(/Evaluation Score:\s*([\d.]+)%/);
    ev = m ? parseFloat(m[1]) : null;
  }
  return { eval: ev, gen: gen ? parseFloat(gen[1]) : null, resolved: resolved ? +resolved[1] : null, tested: tested ? +tested[1] : null };
}

async function runOne(label, srcBin) {
  const { shimDir } = prepareBinary(label, srcBin);
  // FULL isolation for parallel runs:
  //  - own TMPDIR: the harness clones each instance to
  //    `${gettempdir()}/swe_bench_<instance>` and rmtree's it if present, so two
  //    runs on the same instances would clobber each other's checkout. TMPDIR
  //    steers gettempdir().
  //  - own copy of the (888K) harness: predictions/, results/,
  //    benchmark_scores.log are named by SECOND-granularity timestamp, so two
  //    runs starting the same second would collide on those shared files.
  const tmp = join(CACHE, "tmp", `tmp-${label}`);
  mkdirSync(tmp, { recursive: true });
  const runRepo = join(CACHE, `harness-${label}`);
  rmSync(runRepo, { recursive: true, force: true });
  if (sh("cp", ["-a", REPO_DIR, runRepo]).status !== 0) { warn(`${label}: could not copy harness`); return { eval: null, gen: null }; }
  for (const d of ["predictions", "results", "evaluation_results", "logs"]) rmSync(join(runRepo, d), { recursive: true, force: true });
  rmSync(join(runRepo, "benchmark_scores.log"), { force: true });

  const runArgs = ["swe_bench.py", "run", "--limit", String(N), "--backend", "claude"];
  if (noEval) runArgs.push("--no-eval");
  const env = { ...process.env, PATH: `${shimDir}:${process.env.PATH}`, TMPDIR: tmp };
  const r = await shAsync(venvPy, runArgs, { cwd: runRepo, env, stdio: ["ignore", "pipe", "pipe"] });
  const out = (r.stdout || "") + "\n" + (r.stderr || "");
  writeFileSync(join(CACHE, `run-${label}-${version}.log`), out);
  const sc = parseScore(out);
  // Own benchmark_scores.log → last line IS this run's. avg = generation_time / n
  // (Docker eval time excluded — it's binary-independent).
  try {
    const lines = readFileSync(join(runRepo, "benchmark_scores.log"), "utf8").trim().split("\n");
    const last = JSON.parse(lines[lines.length - 1]);
    sc.genTime = typeof last.generation_time === "number" ? last.generation_time : null;
    sc.nInst = last.num_instances || N;
    sc.avgGen = sc.genTime != null && sc.nInst > 0 ? sc.genTime / sc.nInst : null;
  } catch { sc.avgGen = null; }
  if (r.status !== 0 && sc.eval == null && sc.gen == null)
    warn(`${label} run exited ${r.status} with no parseable score — see data/benchmark/run-${label}-${version}.log`);
  ok(`${label}: eval=${sc.eval ?? "n/a"}%  gen=${sc.gen ?? "n/a"}%  avg ${fmtDur(sc.avgGen)}/instance`);
  return sc;
}

// --- 3. run both IN PARALLEL (isolated config + temp dirs) ------------------
if (!noEval) dockerUsed = true; // eval touches Docker → clean up on exit
log(`Running stock + patched CONCURRENTLY (n=${N} each) — halves wall time; each has its own config + temp dir`);
const [stock, patched] = await Promise.all([runOne("stock", stockBin), runOne("patched", patchedBin)]);

// The headline metric is the evaluation score (issues actually fixed); fall
// back to generation score only if eval was skipped/failed for BOTH.
const metric = (stock.eval != null && patched.eval != null) ? "eval" : "gen";
const sVal = stock[metric], pVal = patched[metric];
const stamp = new Date().toISOString().slice(0, 10);
const results = { version, n: N, date: stamp, metric, stock, patched, dataset: "SWE-bench-lite" };
writeFileSync(join(CACHE, `results-${version}.json`), JSON.stringify(results, null, 2));

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
  const metricName = metric === "eval" ? "evaluation accuracy (issues actually fixed)" : "generation rate (patches produced) — EVAL SKIPPED";
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

Measured with the [SWE-bench harness](${HARNESS_URL}) — the **stock** vs the **un-nerfed** build of the *same* Claude Code version, so the only variable is the patch. Both run at their own defaults (the patched build's lifted effort/model defaults count too), each under a fresh \`CLAUDE_CONFIG_DIR\` so local \`settings.json\` can't skew it.

![Un-nerf effect on SWE-bench-lite](docs/benchmark.svg)

| Build | ${metricLabel} | avg runtime / instance |
|---|---|---|
| Stock v${version} | **${sVal.toFixed(1)}%**${sCount} | ${sRt} |
| Un-nerfed v${version} | **${pVal.toFixed(1)}%**${pCount} (${delta >= 0 ? "+" : ""}${delta} pts) | ${pRt}${slower} |

SWE-bench-lite, **n=${n}**, ${date}. Runtime is model generation time per instance (Docker eval excluded); the un-nerfed build defaults to **max** effort so it runs longer — the per-instance generation cap is raised to ${GEN_TIMEOUT}s so it isn't cut off. **Caveat:** at this n the accuracy is *indicative, not statistically significant* — each instance is worth ${(100 / n).toFixed(0)} points and the model is nondeterministic, so a few-point swing (either direction) is within the noise. Re-run at a larger n for a real number: \`./upgrade.sh --benchmark=50\`.
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

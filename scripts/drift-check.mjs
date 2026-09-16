#!/usr/bin/env node
/**
 * drift-check.mjs — answer "do we need to upgrade, and what would break?" for a
 *                   Claude Code release we do not ship a catalog for yet.
 *
 * WHY THIS EXISTS (read before reaching for grep again)
 * -----------------------------------------------------
 * The obvious way to ask "is this prompt still in the new build" is to grep the
 * unpacked bundle for the prompt's text. That is WRONG and quietly so, because
 * the two sides are in different encodings:
 *
 *   catalog `pieces`  DECODED runtime text  — a real newline, a real `"`, a real em dash
 *   bundle source     QUOTED literal text   — `\n`, `\"`, `—`, and backticks
 *                                             escaped inside template literals
 *
 * A multi-line prompt body therefore never appears verbatim in the bundle, so a
 * substring probe reports it missing. Measured on the real thing: probing the
 * v2.1.272 catalog against the very bundle it was generated from — where the
 * true answer is "all 6333 present" — a raw-text probe called 19.6% of them
 * missing. Any conclusion drawn from that number is noise, and two of this
 * repo's judgement calls were nearly made on it (a "20% catalog churn" upgrade
 * recommendation, and the ACK_REMOVED verification for the v2.1.270 gate-6
 * removals).
 *
 * The fix is to decode BOTH sides rather than to loosen the matcher: run the
 * target bundle through the same extractor + AST normalizer the catalog itself
 * was built with, canonicalize each string, and compare identity keys. That is
 * an exact comparison with no false positives — the same 6333-entry catalog
 * scores 100% against its own bundle.
 *
 * WHAT IT REPORTS
 * ---------------
 *   1. Catalog survival — how many shipped prompts still exist byte-identically
 *      in the target build, by identity key. A prompt that is absent was either
 *      reworded or deleted upstream.
 *   2. Un-nerf rule risk — for each rule in apply-unnerfs.py, whether the prompt
 *      it is keyed to survives. A rule whose prompt is gone is the one that will
 *      FAIL or go MISSING on the next sync, so this is the number that decides
 *      whether an upgrade is cheap or expensive.
 *   3. Effort surface — the same posture counters apply-code-patches.mjs tracks,
 *      so a new `default_effort` surface shows up here too rather than only
 *      after a full upgrade run.
 *
 * It is READ-ONLY: it never writes to data/, system-prompts/, or the installed
 * binary. Use it to decide whether to run ./upgrade.sh, not instead of it — only
 * a real sync can prove apply-unnerfs.py passes.
 *
 * USAGE
 *   node scripts/drift-check.mjs [<version>|<jsDir>] [--catalog PATH] [--quiet]
 *
 *     <version>   an npm version (default: whatever npm reports as latest).
 *                 Fetched into a temp prefix and unpacked; the global install is
 *                 never touched.
 *     <jsDir>     an already-unpacked bundle directory (skips the download).
 *     --catalog   catalog to compare against (default: the newest in data/prompts).
 *
 * EXIT CODES
 *   0  no rule is at risk — an upgrade would be routine
 *   1  at least one un-nerf rule's prompt changed or vanished — budget for
 *      re-anchoring (UNNERF-GUIDE Part 6)
 *   2  bad usage / could not resolve a bundle
 */

import { readFileSync, readdirSync, existsSync, mkdtempSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { extract, isMarkdownAssetPath, extractMarkdownAsset } from "../engine/extract-prompts.mjs";
import { canonicalize } from "./prompt-index.mjs";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");

const argv = process.argv.slice(2);
const QUIET = argv.includes("--quiet");
const opt = (flag, dflt = null) => {
  const i = argv.indexOf(flag);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt;
};
const positional = argv.filter((a, i) => !a.startsWith("--") && argv[i - 1] !== "--catalog");

const die = (msg, code = 2) => {
  console.error(`drift-check: ${msg}`);
  process.exit(code);
};
const say = (...a) => { if (!QUIET) console.log(...a); };

// --- resolve the catalog we are comparing against ---------------------------
function latestCatalog() {
  const dir = join(REPO, "data", "prompts");
  const cands = readdirSync(dir)
    .filter((f) => /^prompts-[\d.]+\.json$/.test(f))
    .filter((f) => !existsSync(join(dir, f + ".incomplete")))
    .sort((a, b) => cmpVersion(verOf(a), verOf(b)));
  if (!cands.length) die(`no complete catalog in ${dir}`);
  return join(dir, cands[cands.length - 1]);
}
const verOf = (s) => (s.match(/[\d.]+/) || ["0"])[0];
const cmpVersion = (a, b) => {
  const pa = a.split(".").map(Number), pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0);
  }
  return 0;
};

// --- resolve the target bundle ----------------------------------------------
// A directory is used as-is. Anything else is treated as an npm version and
// fetched into a temp prefix, exactly as upgrade.sh does, so this never disturbs
// the installed binary.
function resolveBundle(arg) {
  if (arg && existsSync(arg) && statSync(arg).isDirectory()) return { dir: arg, version: null };
  let version = arg;
  if (!version) {
    try {
      version = execFileSync("npm", ["view", "@anthropic-ai/claude-code", "version"], { encoding: "utf8" }).trim();
    } catch {
      die("could not query npm for the latest version; pass one explicitly");
    }
  }
  const work = mkdtempSync(join(tmpdir(), `unnerfcc-drift-${version}-`));
  say(`fetching Claude Code v${version} (temp prefix — your install is untouched)`);
  try {
    execFileSync("npm", ["install", "--prefix", work, `@anthropic-ai/claude-code@${version}`,
      "--no-audit", "--no-fund", "--loglevel=error"], { stdio: "ignore" });
  } catch {
    die(`npm could not fetch @anthropic-ai/claude-code@${version}`);
  }
  const bin = join(work, "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe");
  if (!existsSync(bin)) die(`fetched v${version} but its native binary is missing at ${bin}`);
  const dir = join(work, "js");
  say(`unpacking v${version}`);
  try {
    execFileSync("node", [join(REPO, "engine", "bun-binary.mjs"), "unpack", bin, dir], { stdio: "ignore" });
  } catch {
    die(`could not unpack v${version} — if the Bun container format changed, see engine/bun-binary.mjs`);
  }
  return { dir, version };
}

// --- extract + canonicalize the target bundle -------------------------------
// Same code path gen-catalog.mjs uses, which is the whole point: both sides end
// up as decoded, AST-normalized text, so comparison is exact.
function canonicalKeys(dir, version) {
  const files = [];
  (function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      e.isDirectory() ? walk(p) : files.push(p);
    }
  })(dir);
  const keys = new Set();
  let unparseable = 0;
  for (const f of files) {
    const rel = f.slice(dir.length + 1);
    let src;
    try { src = readFileSync(f, "utf8"); } catch { continue; }
    let sites = [];
    try {
      if (isMarkdownAssetPath(rel)) {
        const a = extractMarkdownAsset(src, version);
        sites = a ? (Array.isArray(a) ? a : [a]) : [];
      } else {
        sites = extract(src, version, { all: true }) || [];
      }
    } catch { unparseable++; continue; }
    for (const s of sites) keys.add(canonicalize(s.pieces ?? [], s.identifiers ?? []));
  }
  return { keys, files: files.length, unparseable };
}

// --- effort posture ---------------------------------------------------------
// Counted over raw source on purpose: these are code shapes, not prompt text,
// so the decode/quote distinction above does not apply to them.
function posture(dir) {
  const files = [];
  (function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      e.isDirectory() ? walk(p) : files.push(p);
    }
  })(dir);
  let src = "";
  for (const f of files) { try { src += readFileSync(f, "utf8") + "\n"; } catch {} }
  const count = (re) => (src.match(re) || []).length;
  return {
    defaultEffortHigh: count(/default_effort:"high"/g),
    defaultEffortXhigh: count(/default_effort:"xhigh"/g),
    effortEnumUncapped: count(/\["low","medium","high","xhigh","max"\]/g),
  };
}

// --- main -------------------------------------------------------------------
const catalogPath = opt("--catalog", latestCatalog());
if (!existsSync(catalogPath)) die(`catalog not found: ${catalogPath}`);
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const prompts = catalog.prompts || catalog;
const ourVersion = catalog.version || verOf(catalogPath);

const { dir, version } = resolveBundle(positional[0]);
const target = version || "(unpacked dir)";
const { keys, files, unparseable } = canonicalKeys(dir, version || ourVersion);

say("");
say(`shipped catalog : v${ourVersion} (${prompts.length} prompts)`);
say(`target build    : v${target} (${files} modules, ${unparseable} unparseable)`);
say(`distinct strings in target: ${keys.size}`);

// 1. catalog survival, by exact identity key
// Count ENTRIES for the survival rate but keep a Set of ids for the rule
// lookup below: ~100 catalog entries share an id (the same prompt reused at
// several call-sites), so a Set would undercount the rate.
const survivedIds = new Set();
let survivedEntries = 0;
const lost = [];
for (const p of prompts) {
  const k = canonicalize(p.pieces ?? [], p.identifiers ?? []);
  if (keys.has(k)) { survivedEntries++; survivedIds.add(p.id); }
  else lost.push(p.id);
}
const pct = ((100 * survivedEntries) / prompts.length).toFixed(1);
say("");
say(`catalog prompts still byte-identical: ${survivedEntries} of ${prompts.length} (${pct}%)`);
say(`  reworded or deleted upstream      : ${lost.length}`);

// 2. un-nerf rule risk — a rule is at risk exactly when its prompt did not survive
let rules = [];
try {
  const dump = join(tmpdir(), `unnerfcc-rules-${process.pid}.json`);
  execFileSync("python3", [join(REPO, "scripts", "apply-unnerfs.py"), "--dump-rules", dump], { stdio: "ignore" });
  const raw = JSON.parse(readFileSync(dump, "utf8"));
  rules = Array.isArray(raw) ? raw : (raw.rules || Object.values(raw).flat());
} catch {
  say("");
  say("could not dump un-nerf rules — skipping the rule-risk report");
}

const atRisk = [];
const seen = new Set();
for (const r of rules) {
  if (survivedIds.has(r.id)) continue;
  const key = `${r.id}::${r.description}`;
  if (seen.has(key)) continue;
  seen.add(key);
  atRisk.push(r);
}
say("");
say(`un-nerf rules whose prompt changed or vanished: ${atRisk.length} of ${rules.length}`);
for (const r of atRisk) say(`   - ${r.id}\n       ${r.description}`);

// 3. effort surface
const post = posture(dir);
say("");
say("effort surface:");
say(`   default_effort:"high"  ${post.defaultEffortHigh}`);
say(`   default_effort:"xhigh" ${post.defaultEffortXhigh}`);
say(`   uncapped effort enum   ${post.effortEnumUncapped}`);
say("   (compare against data/effort-posture.json; a jump means a new surface)");

say("");
say(atRisk.length
  ? `VERDICT: upgrading would need ${atRisk.length} rule(s) re-anchored (UNNERF-GUIDE Part 6).`
  : "VERDICT: no un-nerf rule is at risk — an upgrade would be routine.");
say("Only ./upgrade.sh can prove apply-unnerfs.py passes; this is a forecast.");

process.exit(atRisk.length ? 1 : 0);

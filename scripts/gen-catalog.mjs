#!/usr/bin/env node
/**
 * gen-catalog.mjs — generate a prompt catalog (prompts-<version>.json) from an
 *                   extracted Claude Code JS bundle, using the vendored
 *                   tweakcc extractor. This replaces DOWNLOADING skrabe's
 *                   catalog: we produce our own on release day.
 *
 * The extractor (vendor/tweakcc/tools/promptExtractor.js) reads:
 *   - the JS bundle (arg 1),
 *   - a sibling package.json whose `version` stamps the catalog,
 *   - the output path AS A SEED (if it exists) for cross-version identity
 *     carry-forward (mergeWithExisting),
 *   - optionally $TWEAKCC_UPSTREAM_JSON for identifierMap fidelity.
 * It writes {version, prompts:[...]} to the output path.
 *
 * We give it a private temp workdir (cli.js + package.json) and pre-seed the
 * output with the PREVIOUS catalog so unchanged/reworded prompts keep their ids
 * (our apply-unnerfs rules are keyed by id). What it can't identify is left
 * anonymous → picked up by relabel.mjs.
 *
 * USAGE
 *   node gen-catalog.mjs <cliJsPath> <version> <outCatalog.json> [<seedCatalog.json>]
 * ENV
 *   TWEAKCC_UPSTREAM_JSON  optional path to Piebald's prompts-<version>.json
 */

import { mkdtempSync, copyFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO = join(SCRIPT_DIR, "..");
const EXTRACTOR = join(REPO, "vendor", "tweakcc", "tools", "promptExtractor.js");

function die(msg, code = 1) {
  console.error(`gen-catalog: ${msg}`);
  process.exit(code);
}

const [cliJs, version, outCatalog, seedCatalog] = process.argv.slice(2);
if (!cliJs || !version || !outCatalog) {
  die("usage: node gen-catalog.mjs <cliJsPath> <version> <outCatalog.json> [seedCatalog.json]", 2);
}
if (!existsSync(cliJs)) die(`cli.js not found: ${cliJs}`);
if (!existsSync(EXTRACTOR)) die(`vendored extractor not found: ${EXTRACTOR} (did you vendor it?)`);

// Private workdir: the extractor reads its version from a sibling package.json.
const work = mkdtempSync(join(tmpdir(), `unnerfcc-gen-${version}-`));
try {
  const workCli = join(work, "cli.js");
  copyFileSync(cliJs, workCli);
  writeFileSync(
    join(work, "package.json"),
    JSON.stringify({ name: "@anthropic-ai/claude-code", version })
  );

  // Seed the output with the previous catalog so identity carries forward.
  if (seedCatalog && existsSync(seedCatalog)) {
    copyFileSync(seedCatalog, outCatalog);
    console.error(`seeded ${outCatalog} from ${seedCatalog}`);
  }

  const env = { ...process.env };
  if (env.TWEAKCC_UPSTREAM_JSON) console.error(`using upstream maps: ${env.TWEAKCC_UPSTREAM_JSON}`);

  const r = spawnSync("node", [EXTRACTOR, workCli, outCatalog], {
    stdio: ["ignore", "pipe", "inherit"],
    env,
    encoding: "utf-8",
    maxBuffer: 256 * 1024 * 1024,
  });
  if (r.status !== 0) die(`extractor exited ${r.status}`, r.status || 1);

  // Surface the extractor's own accounting so upgrade.sh can gate on it.
  const log = r.stdout || "";
  const count = (re) => (log.match(re) || []).length;
  const noMatch = count(/^No match for item/gm);
  const assigned = count(/^Assigned new prompt item/gm);
  const fuzzy = count(/^Fuzzy-matched item/gm);
  console.error(
    `extractor: fuzzy-matched ${fuzzy}, assigned ${assigned}, no-match ${noMatch} (no-match + still-anonymous → relabel worklist)`
  );
  console.log(outCatalog);
} finally {
  rmSync(work, { recursive: true, force: true });
}

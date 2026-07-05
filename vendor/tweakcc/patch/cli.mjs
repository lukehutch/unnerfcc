#!/usr/bin/env node
/**
 * Thin CLI over the vendored tweakcc-fixed system-prompt patcher.
 *
 *   node cli.mjs apply <inJs> <catalog.json> <systemPromptsDir> <outJs>
 *     Splice edited system-prompt `.md` files into a Claude Code JS bundle.
 *       <inJs>             — the unpacked CC JS bundle (see ../native unpack)
 *       <catalog.json>     — a prompts-<version>.json catalog (StringsFile) that
 *                            pairs prompt ids with their cli.js anchor "pieces"
 *                            and identifier maps. Read LOCALLY; never fetched.
 *       <systemPromptsDir> — dir of edited `<promptId>.md` replacement files
 *       <outJs>            — where the patched JS is written
 *     Loads the catalog, reads the `.md` files, runs `applySystemPrompts`, writes
 *     the patched JS, and prints:
 *       patched=<n>            prompts whose text was spliced in
 *       skipped=<n>            filtered/shadowed/sibling-shape prompts
 *       couldNotFind=<n>       anchors that matched neither the binary nor drift
 *       unchanged=<n>          matched but replacement identical to original
 *       failed=<n>             errored during apply
 *     A `couldNotFind` count means that many prompt anchors did not match this
 *     binary (expected when the catalog version differs from the binary version).
 *
 * IMPORTANT: `./setEnv.ts` is imported FIRST so it sets UNNERF_* env vars from
 * argv before the patcher graph (config/download) initializes. Do not reorder.
 *
 * Exit codes:
 *   0  success (even with couldNotFind > 0 — that is reported, not fatal)
 *   1  generic failure (bad args, I/O error, load error)
 */

import './setEnv.ts';
import fs from 'node:fs';
import { applySystemPrompts } from './patches/systemPrompts.ts';
import { preloadStringsFile } from './systemPromptSync.ts';

function fail(code, msg) {
  process.stderr.write(msg + '\n');
  process.exit(code);
}

async function apply(inJs, catalogPath, promptsDir, outJs) {
  for (const [label, p] of [
    ['input JS', inJs],
    ['catalog', catalogPath],
    ['prompts dir', promptsDir],
  ]) {
    if (!fs.existsSync(p)) fail(1, `apply: ${label} not found: ${p}`);
  }

  // Resolve the version from the catalog itself (falls back to the filename).
  let version;
  let catalogJson;
  try {
    catalogJson = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  } catch (e) {
    fail(1, `apply: could not parse catalog JSON: ${e?.message ?? e}`);
  }
  version =
    catalogJson.version ||
    (catalogPath.match(/prompts-(\d+\.\d+\.\d+[^/]*)\.json$/)?.[1] ?? null);
  if (!version) {
    fail(1, 'apply: could not determine catalog version (no version field or prompts-X.Y.Z.json name)');
  }

  const content = fs.readFileSync(inJs, 'utf8');

  // Load the catalog into the module's global cache. downloadStringsFile is
  // shimmed to read UNNERF_CATALOG_PATH (set by setEnv.ts), so no network.
  const pre = await preloadStringsFile(version);
  if (!pre.success) {
    fail(1, `apply: failed to load catalog: ${pre.errorMessage}`);
  }

  process.stderr.write(
    `apply: version=${version}, catalog prompts=${(catalogJson.prompts || []).length}\n`
  );

  // A genuine anchor miss ("drift") is NOT pushed to `results` by
  // applySystemPrompts — it only emits a `console.log("Could not find system
  // prompt ...")` warning (and is suppressed entirely for `Data:` / the Build-
  // with-Claude-API skill). So the only faithful count of drift misses is the
  // warning stream. Tee console.log through a counter while keeping the output.
  let couldNotFind = 0;
  const origLog = console.log;
  console.log = (...args) => {
    const first = args.length ? String(args[0]) : '';
    if (first.includes('Could not find system prompt')) couldNotFind++;
    origLog.apply(console, args);
  };

  let applyResult;
  try {
    applyResult = await applySystemPromptsCounted();
  } finally {
    console.log = origLog;
  }
  const { newContent, results } = applyResult;

  async function applySystemPromptsCounted() {
    return applySystemPrompts(
      content,
      version,
      undefined, // auto-detect non-ASCII escaping from the binary
      null, // no patch filter — apply every prompt with a matching .md
      undefined // no pristine snapshot — every non-match treated as drift
    );
  }

  fs.writeFileSync(outJs, newContent);

  let patched = 0,
    skipped = 0,
    unchanged = 0,
    failed = 0,
    notAppliedWithDetails = 0;
  for (const r of results) {
    if (r.failed) failed++;
    if (r.skipped) {
      skipped++;
      continue;
    }
    if (r.applied) {
      patched++;
      // `unchanged` details means the anchor matched but the replacement equaled
      // the original — counted within patched, surfaced separately for clarity.
      if (typeof r.details === 'string' && r.details.includes('unchanged')) {
        unchanged++;
      }
    } else {
      // Matched but rejected (leaked placeholder in a backtick literal, or
      // incomplete escaping) — a result WITH details, distinct from drift.
      notAppliedWithDetails++;
    }
  }

  process.stdout.write(`wrote=${outJs}\n`);
  process.stdout.write(`bytes=${Buffer.byteLength(newContent)}\n`);
  process.stdout.write(`totalPrompts=${results.length}\n`);
  process.stdout.write(`patched=${patched}\n`);
  process.stdout.write(`unchanged=${unchanged}\n`);
  process.stdout.write(`skipped=${skipped}\n`);
  process.stdout.write(`rejectedWithDetails=${notAppliedWithDetails}\n`);
  process.stdout.write(`couldNotFind=${couldNotFind}\n`);
  process.stdout.write(`failed=${failed}\n`);
}

async function main() {
  const [, , cmd, ...rest] = process.argv;
  if (cmd === 'apply') {
    if (rest.length < 4) {
      fail(
        1,
        'usage: node cli.mjs apply <inJs> <catalog.json> <systemPromptsDir> <outJs>'
      );
    }
    await apply(rest[0], rest[1], rest[2], rest[3]);
  } else {
    fail(
      1,
      'usage:\n  node cli.mjs apply <inJs> <catalog.json> <systemPromptsDir> <outJs>'
    );
  }
}

main().catch(err => {
  fail(1, `apply: ${err?.stack ?? err?.message ?? String(err)}`);
});

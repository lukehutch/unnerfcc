#!/usr/bin/env node
/**
 * sync-version.mjs — Regenerate system-prompts/ for a given Claude Code
 *                    version, using the same gray-matter@4.0.3 library
 *                    that tweakcc-fixed itself uses.
 *
 * USAGE
 * -----
 *     node scripts/sync-version.mjs 2.1.140                    # most common
 *     node scripts/sync-version.mjs                            # prompts interactively
 *     node scripts/sync-version.mjs 2.1.140 --dry-run          # preview without writing
 *     node scripts/sync-version.mjs 2.1.140 --download         # always fetch (skip local clone)
 *     node scripts/sync-version.mjs 2.1.140 --tweakcc-dir P    # override local clone path
 *     node scripts/sync-version.mjs 2.1.140 --target P         # override output dir
 *     node scripts/sync-version.mjs 2.1.140 --no-clear         # don't wipe existing .md
 *
 * WHAT IT DOES
 * ------------
 * Reads data/prompts/prompts-{version}.json from a local tweakcc-fixed clone
 * (default: G:/Cathedral/repos_external/tweakcc-fixed) or downloads it from
 * the skrabe/tweakcc-fixed GitHub repo. Reconstructs each prompt's body by
 * interleaving the JSON's `pieces` array with human-readable variable names
 * from `identifierMap`, then writes one .md file per prompt to system-prompts/.
 *
 * tweakcc-fixed's catalog lists some prompt IDs at MULTIPLE binary sites
 * (~53 duplicate ids in v2.1.198, one JSON entry per site). Its own syncPrompt
 * creates the .md from the FIRST entry and skips the rest (same id + same
 * ccVersion -> 'skipped'), so this script keeps the first occurrence of each
 * id too — output stays byte-identical to a tweakcc-fixed extraction.
 *
 * The .md format and gray-matter call use the same arguments as tweakcc-fixed's
 * generateMarkdownFromPrompt() in src/systemPromptSync.ts, so output is
 * byte-identical to what `npx tweakcc-fixed --apply` would extract from a
 * freshly installed Claude Code binary at the same version.
 *
 * After running, run `python scripts/apply-unnerfs.py` to re-apply un-nerfs
 * on top of the fresh stock text.
 *
 * EXIT CODES
 * ----------
 *     0  — wrote all files (or in --dry-run, finished without error)
 *     1  — network, JSON, or filesystem error preventing extraction
 *     2  — invalid invocation
 */

import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as readline from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import matter from "gray-matter";

import {
  manifestFromContents,
  diffManifests,
  loadManifest,
  writeManifest,
  formatDiffReport,
  hasDrift,
  DEFAULT_MANIFEST,
} from "./prompt-checksums.mjs";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const DEFAULT_TWEAKCC_DIR = "G:/Cathedral/repos_external/tweakcc-fixed";

const DOWNLOAD_URL =
  "https://raw.githubusercontent.com/skrabe/tweakcc-fixed/" +
  "refs/heads/main/data/prompts/prompts-{version}.json";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const DEFAULT_TARGET = path.join(REPO_ROOT, "system-prompts");

// ---------------------------------------------------------------------------
// Prompt reconstruction (mirrors tweakcc-fixed's systemPromptSync.ts verbatim)
// ---------------------------------------------------------------------------

/**
 * Re-stitch a prompt body from its tokenized pieces. After each piece (except
 * possibly the last), `identifiers[i]` indexes into `identifierMap` to give
 * the human-readable variable name that goes between the pieces. The `${`
 * and `}` wrapping a placeholder are already split into the surrounding
 * pieces by tweakcc-fixed's extractor.
 *
 * Verbatim copy of tweakcc-fixed's reconstructContentFromPieces.
 */
function reconstructContentFromPieces(pieces, identifiers, identifierMap) {
  let result = "";
  for (let i = 0; i < pieces.length; i++) {
    result += pieces[i];
    if (i < identifiers.length) {
      const labelIndex = identifiers[i];
      const humanName =
        identifierMap[String(labelIndex)] || `UNKNOWN_${labelIndex}`;
      result += humanName;
    }
  }
  return result;
}

/**
 * Build the .md file content for a single prompt entry.
 *
 * Mirrors tweakcc-fixed's generateMarkdownFromPrompt: same frontmatter keys, same
 * variables-deduplication via Set, same matter.stringify call with HTML
 * comment delimiters.
 */
function generateMarkdownFromPrompt(prompt) {
  const content = reconstructContentFromPieces(
    prompt.pieces,
    prompt.identifiers,
    prompt.identifierMap,
  );

  // Unique variables in first-seen order — same as
  // [...new Set(Object.values(prompt.identifierMap))] in tweakcc-fixed.
  const variables =
    Object.keys(prompt.identifierMap).length > 0
      ? [...new Set(Object.values(prompt.identifierMap))]
      : undefined;

  const frontmatterData = {
    name: prompt.name,
    description: prompt.description,
    ccVersion: prompt.version,
  };
  if (variables && variables.length > 0) {
    frontmatterData.variables = variables;
  }

  // Pass an explicit file OBJECT, not a raw string. gray-matter's
  // `matter.stringify(str, …)` first re-parses `str` for existing frontmatter
  // (index.js: `if (typeof file === 'string') file = matter(file, options)`).
  // With our `<!--`/`-->` delimiters, a body that itself begins with an HTML
  // comment (only skill-plan-artifact-html-template does) gets its leading
  // comment mis-read as frontmatter — silently hoisting body text into the
  // frontmatter block when that text is valid YAML, and throwing a YAMLException
  // when it isn't (upstream reworded it non-YAML in 2.1.217). Passing `{content}`
  // skips the re-parse, preserving the body verbatim. For every other prompt
  // (body never starts with `<!--`) the re-parse was already a no-op, so output
  // is byte-identical there.
  return matter.stringify({ content }, frontmatterData, {
    delimiters: ["<!--", "-->"],
  });
}

// ---------------------------------------------------------------------------
// Source loading
// ---------------------------------------------------------------------------

async function loadStringsFile(version, tweakccDir, { forceDownload }) {
  if (!forceDownload) {
    // Prefer OUR OWN catalog — unnerfcc now generates prompts-<version>.json
    // itself (upgrade.sh → gen-catalog.mjs), so we no longer depend on skrabe
    // publishing it. This repo-local copy is the source of truth.
    const ours = path.join(REPO_ROOT, "data", "prompts", `prompts-${version}.json`);
    try {
      const text = await fs.readFile(ours, "utf-8");
      console.error(`reading our catalog: ${ours}`);
      return JSON.parse(text);
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    const local = path.join(
      tweakccDir,
      "data",
      "prompts",
      `prompts-${version}.json`,
    );
    try {
      const text = await fs.readFile(local, "utf-8");
      console.error(`reading from local clone: ${local}`);
      return JSON.parse(text);
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
      console.error(
        `local file not found at ${local}; falling back to download`,
      );
    }
  }

  const url = DOWNLOAD_URL.replace("{version}", version);
  console.error(`downloading from ${url}`);

  const resp = await fetch(url, {
    headers: { "User-Agent": "sync-version.mjs" },
  });
  if (!resp.ok) {
    if (resp.status === 404) {
      throw new SystemExit(
        `error: prompts-${version}.json not found on skrabe/tweakcc-fixed GitHub.\n` +
          `  Either the version string is wrong, or tweakcc-fixed hasn't published ` +
          `prompts for that version yet (sometimes lags a few hours behind ` +
          `a Claude Code release).`,
      );
    }
    throw new SystemExit(
      `error: HTTP ${resp.status} ${resp.statusText} fetching ${url}`,
    );
  }
  return await resp.json();
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

class SystemExit extends Error {
  constructor(message, code = 1) {
    super(message);
    this.code = code;
  }
}

function printHelp() {
  console.log(`usage: node sync-version.mjs [options] [version]

Regenerate system-prompts/ from tweakcc-fixed's prompts JSON for a given
Claude Code version.

positional:
  version              Claude Code version, e.g. 2.1.140. If omitted, prompts
                       interactively.

options:
  --tweakcc-dir PATH   Local tweakcc-fixed clone path
                       (default: ${DEFAULT_TWEAKCC_DIR})
  --target PATH        Output directory
                       (default: ${DEFAULT_TARGET})
  --manifest PATH      Stock-prompt MD5 manifest to diff against and update
                       (default: ${DEFAULT_MANIFEST})
  --download           Skip the local clone check; always fetch from GitHub.
  --dry-run            Don't write anything; report what would change
                       (including the stock-checksum diff).
  --no-clear           Don't delete existing files in --target before writing.
  --no-manifest        Don't read or write the stock-checksum manifest.
  -h, --help           Show this help message and exit.

On every run this diffs the freshly-generated STOCK prompts against the MD5
manifest from the previous sync and reports which prompts Anthropic changed,
added, or removed — then rewrites the manifest for the new version. That diff is
the authoritative "what to re-review" list for the un-nerf rules.

After running, run scripts/apply-unnerfs.py to re-apply un-nerfs.`);
}

function validateVersion(v) {
  if (!/^\d+\.\d+\.\d+$/.test(v)) {
    throw new SystemExit(
      `error: '${v}' doesn't look like a Claude Code version (expected X.Y.Z)`,
      2,
    );
  }
  return v;
}

async function promptForVersion() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stderr,
  });
  try {
    const v = (await rl.question("Claude Code version (e.g. 2.1.140): ")).trim();
    if (!v) throw new SystemExit("no version provided; aborting", 2);
    return v;
  } finally {
    rl.close();
  }
}

async function main(argv) {
  let parsed;
  try {
    parsed = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        "tweakcc-dir": { type: "string", default: DEFAULT_TWEAKCC_DIR },
        target: { type: "string", default: DEFAULT_TARGET },
        manifest: { type: "string", default: DEFAULT_MANIFEST },
        download: { type: "boolean", default: false },
        "dry-run": { type: "boolean", default: false },
        "no-clear": { type: "boolean", default: false },
        "no-manifest": { type: "boolean", default: false },
        help: { type: "boolean", short: "h", default: false },
      },
    });
  } catch (err) {
    console.error(`error: ${err.message}`);
    printHelp();
    return 2;
  }

  if (parsed.values.help) {
    printHelp();
    return 0;
  }

  const versionArg = parsed.positionals[0] ?? (await promptForVersion());
  const version = validateVersion(versionArg);
  const target = path.resolve(parsed.values.target);
  const tweakccDir = path.resolve(parsed.values["tweakcc-dir"]);

  const data = await loadStringsFile(version, tweakccDir, {
    forceDownload: parsed.values.download,
  });

  if (data.version !== version) {
    console.error(
      `warning: JSON file's top-level version is '${data.version}' but ` +
        `we asked for '${version}'. Continuing anyway.`,
    );
  }

  const prompts = data.prompts ?? [];
  if (prompts.length === 0) {
    throw new SystemExit("error: JSON file has no 'prompts' array");
  }

  const manifestPath = path.resolve(parsed.values.manifest);
  const useManifest = !parsed.values["no-manifest"];
  const dryRun = parsed.values["dry-run"];

  // Generate every stock .md body once. This is the byte-exact STOCK content
  // (un-nerfs run later, in apply-unnerfs.py), so it's also what we fingerprint.
  // Duplicate ids (same prompt at multiple binary sites): keep the FIRST entry,
  // matching tweakcc-fixed's syncPrompt (create on first sight, skip the rest).
  const seenIds = new Set();
  const entries = [];
  let dupSites = 0;
  for (const p of prompts) {
    if (seenIds.has(p.id)) {
      dupSites++;
      continue;
    }
    seenIds.add(p.id);
    entries.push({ id: p.id, content: generateMarkdownFromPrompt(p) });
  }
  if (dupSites > 0) {
    console.error(
      `note: ${dupSites} duplicate prompt sites collapsed to first occurrence ` +
        `(${entries.length} unique prompts from ${prompts.length} sites)`,
    );
  }

  // Stock-checksum diff: the authoritative "what did Anthropic change" report.
  // Runs on every invocation (dry-run included), comparing the freshly built
  // stock against the manifest written by the previous sync.
  if (useManifest) {
    const newManifest = manifestFromContents(entries);
    const prior = await loadManifest(manifestPath);
    const diff = diffManifests(prior?.prompts, newManifest);
    console.error(
      formatDiffReport(diff, {
        prevVersion: prior?.ccVersion ?? null,
        newVersion: version,
      }),
    );
    if (prior && hasDrift(diff)) {
      console.error(
        "\n-> Re-review the CHANGED prompts' un-nerf rules and the ADDED " +
          "prompts for new brevity nerfs (see UNNERF-GUIDE.md). " +
          "Removed prompts: retire their rules.",
      );
    }
    if (!dryRun) {
      await writeManifest(manifestPath, { ccVersion: version, prompts: newManifest });
      console.error(`\nupdated stock-checksum manifest: ${manifestPath} (v${version})`);
    } else {
      console.error(`\n[dry-run] manifest ${manifestPath} would be rewritten for v${version}`);
    }
    console.error("");
  }

  if (dryRun) {
    console.error(
      `[dry-run] would write ${entries.length} stock files to ${target} for v${version}`,
    );
    return 0;
  }

  // Clear-and-rewrite. Wipe stale .md files only; leave the directory itself
  // and any non-.md siblings alone.
  if (!parsed.values["no-clear"]) {
    try {
      const existing = await fs.readdir(target);
      for (const name of existing) {
        if (name.endsWith(".md")) {
          await fs.unlink(path.join(target, name));
        }
      }
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
      await fs.mkdir(target, { recursive: true });
    }
  } else {
    await fs.mkdir(target, { recursive: true });
  }

  let written = 0;
  for (const { id, content } of entries) {
    const out = path.join(target, `${id}.md`);
    // Write as bytes (no encoding transform) to keep LF line endings on every
    // platform — matches tweakcc-fixed's output on Windows.
    await fs.writeFile(out, content, { encoding: "utf-8" });
    written++;
  }

  console.error(
    `wrote ${written} files to ${target} (Claude Code v${version})`,
  );
  console.error(`next: python scripts/apply-unnerfs.py`);
  return 0;
}

// Use process.exitCode rather than process.exit() so the event loop drains
// naturally — pending sockets (e.g. the failed fetch) get to close cleanly
// instead of triggering a libuv assertion on Windows.
try {
  process.exitCode = await main(process.argv.slice(2));
} catch (err) {
  if (err instanceof SystemExit) {
    console.error(err.message);
    process.exitCode = err.code;
  } else {
    console.error("unexpected error:");
    console.error(err);
    process.exitCode = 1;
  }
}

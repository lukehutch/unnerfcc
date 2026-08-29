#!/usr/bin/env node
// extract-prompts.mjs — unnerfcc's own prompt-catalog extractor.
//
// Parses a Claude Code JS bundle (cli.js, minified or not) with @babel/parser,
// NORMALIZES the AST in memory (engine/normalize-ast.mjs) so that every way of
// spelling a string collapses to one shape, and emits a catalog:
//   { version, prompts: [ { name, id, description, pieces, identifiers,
//                            identifierMap, version } ] }
//
// WHY NORMALIZE FIRST
// -------------------
// The bundle spells the same prompt differently from build to build: `"a"+x+"b"`
// one release, `` `a${x}b` `` the next, single quotes here, double quotes there,
// a `+` chain split at a different point. Matching those by hand needs a pile of
// per-encoding special cases, and any gap in them shows up as a prompt that
// "disappeared" on a version bump. Normalizing the AST first removes the problem
// at the root: after normalizeProgram() every string-producing expression is a
// TemplateLiteral whose interpolations are bare variables, so there is exactly
// ONE kind of node to read and ONE string to hash. No runs to re-align, no
// encoding table, no fuzzy tier.
//
// PIECES AND IDENTIFIERS
// ----------------------
// A site's canonical text is literal runs interleaved with BARE `${}` slot
// markers: no variable name and no index reaches the hash, so nothing a minifier
// does to identifiers (renaming `Wv` to `q3`, or reusing one variable where the
// last build used two) can churn the catalog. `pieces` are those literal runs.
// `identifiers[i]` — the first-occurrence index of the variable behind marker i —
// is carried alongside purely as DISPLAY scaffolding, so the `.md` can label a
// repeated variable with the same human name in both places. It is exactly the
// catalog shape this repo already ships, so the normalization changes how
// identity is COMPUTED without changing how a catalog is SERIALIZED.
// scripts/prompt-index.mjs re-derives the canonical text from the pair, so
// `identityHash(entry) === sha256(canonicalText(node))` by construction and the
// extractor and the patcher can never drift apart.
//
// This is our own code — no tweakcc lineage.
//
// CLI:  node extract-prompts.mjs <cli.js> <out-catalog.json> [--all|--include-all]
//   - reads the CC version from a package.json sibling of <cli.js>
//   - if <out-catalog.json> already exists it is IGNORED (seeding /
//     carry-forward is a separate script's job)

import { readFileSync, writeFileSync, existsSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parse } from '@babel/parser';
import {
  normalizeProgram,
  collectStringNodes,
  parseCanonical,
} from './normalize-ast.mjs';
import { canonicalize } from '../scripts/prompt-index.mjs';

// ---------------------------------------------------------------------------
// ONE parse configuration, shared by the extractor and the patcher.
// ---------------------------------------------------------------------------
// They must see byte-identical ASTs or a prompt could hash one way at extraction
// and another at splice time. No jsx/typescript plugins: the bundle is plain JS
// and a JSX plugin would try to read a `<` comparison as an element.
export const PARSE_OPTS = { sourceType: 'unambiguous', errorRecovery: true };

/** Parse a bundle and put its AST into normal form. */
export function parseNormalized(code) {
  const ast = parse(code, PARSE_OPTS);
  const stats = normalizeProgram(ast);
  return { ast, stats };
}

// ---------------------------------------------------------------------------
// Version / build-time normalization so churn doesn't create spurious diffs.
// ---------------------------------------------------------------------------
export function normalizeVersion(s, version) {
  let out = s;
  if (version) {
    // Escape regex metachars in the version (the dots).
    const v = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(new RegExp(v, 'g'), '<<CCVERSION>>');
  }
  // BUILD_TIME:"...Z" ISO timestamp.
  out = out.replace(/BUILD_TIME:"[^"]*Z"/g, 'BUILD_TIME:"<<BUILD_TIME>>"');
  return out;
}

// ---------------------------------------------------------------------------
// Sites: every string-producing node in the normalized tree.
// ---------------------------------------------------------------------------
// A site carries the live AST NODE, not a source span — patching mutates the node
// (see engine/patch-prompts.mjs) and the bundle is regenerated from the tree, so
// there is nothing to keep in sync with byte offsets.
//
//   node          the AST node to read or rewrite
//   kind          "template" (patchable) | "quoted" (read-only — see below)
//   names         the node's own slot variable names, first-occurrence order;
//                 `names[identifiers[i]]` is the variable behind marker i
//   pieces        literal runs, decoded and version-normalized
//   identifiers   slot marker index between piece i and piece i+1
//   identifierMap one empty display name per DISTINCT slot (relabel fills these)
//   key           canonicalize(pieces, identifiers) — what identityHash digests
//
// A "quoted" site is a literal normalization had to leave alone because a
// backtick is a syntax error there. On the 2.1.219 bundle that is 6,944 nodes,
// every one of them a property key, so they are catalogued for recall but never
// written: rewriting one would rename a property, not edit a message.
export function collectSites(ast, version) {
  const sites = [];
  for (const { node, kind, text, names, slots } of collectStringNodes(ast)) {
    const { texts } = parseCanonical(text);
    const pieces = texts.map((t) => normalizeVersion(t, version));
    const identifierMap = {};
    for (let i = 0; i < names.length; i++) identifierMap[String(i)] = '';
    sites.push({
      node, kind, names, pieces,
      identifiers: slots,
      identifierMap,
      key: canonicalize(pieces, slots),
    });
  }
  return sites;
}

// ---------------------------------------------------------------------------
// Inclusion filters
// ---------------------------------------------------------------------------
// There used to be a third, heuristic mode here that scored a node on the ~140
// characters of SOURCE TEXT preceding it (`description:`, `throw`, …). Nothing
// called it — gen-catalog uses `--all`, classify and prune-subsumed use
// `--include-all` — and it cannot survive normalization anyway, because a folded
// or hoisted node is synthesized and has no source offset to look behind. It is
// gone rather than re-engineered for a caller that does not exist.
function looksLikeBlob(v) {
  if (v.startsWith('#!/usr/bin/env')) return true;
  if (v.startsWith('<!DOCTYPE') || v.startsWith('<!doctype')) return true;
  if (v.startsWith('(()=>{') || v.startsWith('(function')) return true;
  if (v.startsWith('data:')) return true;
  // Long unbroken base64/hex/token blob with no whitespace.
  if (v.length > 80 && !/\s/.test(v) && /^[A-Za-z0-9+/=_-]+$/.test(v)) return true;
  return false;
}
export { looksLikeBlob };

// Short floor for `all` mode: recall is flat below ~10 chars (measured), so a
// small floor trims single-token/char noise without dropping any seed prompt.
const ALL_MIN = 8;

// includeAll (the default): STRUCTURAL pre-filter only — keep anything that could
// be prose for Claude to classify, drop only what is *definitionally* not a prompt
// (no whitespace = a single token/identifier; too short; a blob; a bare URL/path).
// This is NOT a "looks like a prompt" guess.
//
// all: emit EVERY non-blob literal >= ALL_MIN chars with NO whitespace/URL/path
// filter — for gen-catalog's SEED-MATCHING, where the seed is the whitelist so
// over-inclusion is free and RECALL is what matters. This is what lets short and
// structural seed prompts ("[Thinking removed]", "No files found") carry by exact
// identity hash instead of being spuriously reported REMOVED.
function includes(probe, all) {
  if (looksLikeBlob(probe)) return false;
  if (all) return probe.length >= ALL_MIN;
  const t = probe.trim();
  return probe.length >= 24 && /\s/.test(t) &&
    !/^https?:\/\/\S+$/.test(t) && !/^[/~][\w./-]+$/.test(t);
}

// ---------------------------------------------------------------------------
// Main extraction.
// ---------------------------------------------------------------------------
// Deduplicated by canonical key: several nodes routinely share one text (the same
// message emitted at two call sites), and every consumer keys on the identity hash
// anyway, so emitting the duplicates only inflates the file.
export function extract(code, version, { all = false } = {}) {
  const { ast } = parseNormalized(code);
  const out = [];
  const seen = new Set();
  for (const site of collectSites(ast, version)) {
    if (seen.has(site.key)) continue;
    if (!includes(site.pieces.join(''), all)) continue;
    seen.add(site.key);
    out.push({
      name: '', id: '', description: '',
      pieces: site.pieces,
      identifiers: site.identifiers,
      identifierMap: site.identifierMap,
      version,
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Whole-file markdown/text asset extraction (v2.1.251+)
// ---------------------------------------------------------------------------
// v2.1.251 moved a real slice of Claude Code's own prompt/skill/reference
// content OUT of JS string literals and into standalone .md/.txt asset
// modules (confirmed by content, not just by name: SKILL-*.md are skill
// bodies, README-*.md and <topic>-*.md are reference docs, loopAutonomous
// Preamble(Persistent)-*.md are the autonomous-loop system prompts, etc).
// extract()'s Babel parser can't see these — they aren't JS — and they were
// previously silently swallowed by the same catch-and-skip meant for native
// binaries and HTML templates, meaning this content had zero classification,
// catalog, or un-nerf coverage at all, not just a few missed reword matches.
//
// Each such file gets ONE catalog entry spanning its ENTIRE content — there
// is no sub-file structure to extract the way there is for JS string
// literals scattered through code, so pieces is always a single element and
// identifiers is always []. Confirmed empirically (2026-08-29, real v2.1.251
// binary): zero of the 121 genuine .md/.txt asset files contain a bare ${}
// runtime-interpolation slot (the convention used everywhere else in this
// project for a real slot). The ~40 files that DO contain ${...} are a
// different category: verbatim bundled source of an external design
// system's own Storybook/build files (named like
// source-storybook.mjs-<hash>.txt.zst), shipped as reference material for
// the Artifact tool's design-system integration — not Claude Code's own
// prompt text. isMarkdownAssetPath excludes them by their embedded
// real-extension-before-hash naming pattern (FOREIGN_ASSET_RE): a genuine
// prompt asset's Bun-assigned hash suffix follows the topic name directly
// (`loopAutonomousPreamble-07qcyhv4.md`), while a bundled foreign file's
// suffix follows its OWN original extension (`source-storybook.mjs-
// 125aecbd.txt.zst` — the `.mjs` is the giveaway, not the trailing `.txt`
// every zstd-compressed text module shares).
// [0-9a-z]{6,}, not just hex: confirmed empirically that Bun's hash suffix
// alphabet is wider than hex (e.g. "893t268n", "zm5eq8m1" — real suffixes on
// genuine .html-named foreign assets that a hex-only pattern would have
// missed and misclassified as prompt content).
const FOREIGN_ASSET_RE = /\.(mjs|jsx?|tsx?|html?|css|py|json)-[0-9a-z]{6,}$/i;

export function isMarkdownAssetPath(relPath) {
  const base = relPath.replace(/\.zst$/i, '');
  if (!/\.(md|txt)$/i.test(base)) return false;
  const stem = base.replace(/\.(md|txt)$/i, '');
  return !FOREIGN_ASSET_RE.test(stem);
}

export function extractMarkdownAsset(source, version) {
  const text = normalizeVersion(source, version);
  if (!text.trim() || looksLikeBlob(text)) return [];
  return [{
    name: '', id: '', description: '',
    pieces: [text], identifiers: [], identifierMap: {},
    version,
  }];
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function readVersion(cliPath) {
  const pkgPath = join(dirname(cliPath), 'package.json');
  if (!existsSync(pkgPath)) {
    throw new Error(`package.json not found next to ${cliPath} (expected ${pkgPath})`);
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  if (!pkg.version) throw new Error(`no "version" field in ${pkgPath}`);
  return pkg.version;
}

function main() {
  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const [cliPath, outPath] = args.filter((a) => !a.startsWith('--'));
  if (!cliPath || !outPath) {
    console.error('usage: node extract-prompts.mjs <cli.js> <out-catalog.json> [--all|--include-all]');
    process.exit(2);
  }
  const version = readVersion(cliPath);
  const code = readFileSync(cliPath, 'utf8');

  const prompts = extract(code, version, { all });

  // Deterministic ordering: by pieces.join, then by identifiers signature.
  prompts.sort((a, b) => {
    const ja = a.pieces.join('');
    const jb = b.pieces.join('');
    if (ja < jb) return -1;
    if (ja > jb) return 1;
    const ia = a.identifiers.join(',');
    const ib = b.identifiers.join(',');
    return ia < ib ? -1 : ia > ib ? 1 : 0;
  });

  const catalog = { version, prompts };
  writeFileSync(outPath, JSON.stringify(catalog, null, 2));

  const withInterp = prompts.filter((p) => p.identifiers.length > 0).length;
  console.log(`extracted ${prompts.length} prompts (${withInterp} with interpolations) -> ${outPath}`);
}

// Only run the CLI when invoked directly — NOT when imported (e.g. by classify.mjs).
// realpath argv[1] before comparing — import.meta.url is symlink-resolved by
// Node's loader, argv[1] isn't (e.g. macOS's /tmp -> /private/tmp), so a raw
// comparison silently skips main() while still exiting 0 when run through one.
import { pathToFileURL } from 'node:url';
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  main();
}

#!/usr/bin/env node
// patch-prompts.mjs — splice edited system-prompt .md files into a Claude Code
// JS bundle by NORMALIZING its AST, matching string-producing NODES on their
// canonical text, mutating the matched nodes in place, and regenerating the
// bundle from the tree. No regexes over the raw text, and no source spans.
//
// WHY NODES, NOT SPANS
// -------------------
// The bundle spells the same prompt differently from build to build — a single-
// or double-quoted literal, a backtick template, a `+` chain split at a different
// point. Locating a prompt across those spellings used to need a per-encoding
// matcher and a per-run source span to overwrite, and every gap in that machinery
// showed up as a prompt that "vanished" on a version bump.
//
// engine/normalize-ast.mjs removes the problem at the root: the AST is put into
// normal form the moment it is parsed, BEFORE anything is hashed, so every way of
// writing a string collapses to ONE shape (a TemplateLiteral whose interpolations
// are bare variables). A prompt is then located by a plain sha256 of the one
// string its node renders to — the same hash the catalog is keyed by, computed by
// the same code (scripts/prompt-index.mjs) — and patched by writing new text onto
// that node. Regenerating the tree emits the patched bundle.
//
// Slots cannot be corrupted by a splice: `setNodeText` rebuilds the node's quasis
// from the new literal runs and rebinds the markers POSITIONALLY — the i-th
// `${...}` in the edited body becomes the i-th interpolation the stock node
// already had, so the original variables are restored in place. The hash is blind
// to which variable sits behind a slot (it digests a bare `${}`), so position is
// the only binding there is: an edit that drops, adds, or reorders a placeholder
// has no valid binding and the splice fails closed rather than guessing.
//
// IDEMPOTENCY
// -----------
// normalize -> denormalize -> generate is a proven fixed point on the real bundle
// (both the emitted source and the hash set are unchanged by a second round), so
// running this on its own output changes nothing on its own. Patching is
// idempotent in that context too: on a re-run the edited .md now equals the node's
// text, which reports `unchanged` instead of writing it again.
//
// CLI:
//   node patch-prompts.mjs apply <inJs> <catalog.json> <systemPromptsDir> <outJs>

import { readFileSync, writeFileSync, existsSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { parseNormalized, collectSites } from "./extract-prompts.mjs";
import { denormalizeProgram, setNodeText, collectStringNodes, canonicalText } from "./normalize-ast.mjs";
import { canonicalize, reconstruct, renderSlot } from "../scripts/prompt-index.mjs";

// ---------------------------------------------------------------------------
// Frontmatter (.md) parsing
// ---------------------------------------------------------------------------
// The .md files use HTML-comment delimiters for frontmatter:
//   <!--
//   name: ...
//   ccVersion: 2.1.201
//   variables:
//     - SOME_VAR
//   -->
//   <body with ${HUMAN_NAME} placeholders>
// We only need ccVersion (informational) and the raw body (untrimmed).
export function parseMd(text) {
  const m = text.match(/^<!--\r?\n([\s\S]*?)\r?\n-->\r?\n?/);
  if (!m) return { ccVersion: null, content: text };
  const fm = m[1];
  const cv = fm.match(/^ccVersion:\s*(.+?)\s*$/m);
  const content = text.slice(m[0].length);
  return { ccVersion: cv ? cv[1].trim() : null, content };
}

// ---------------------------------------------------------------------------
// Split an edited .md body back into one run per stock run.
// ---------------------------------------------------------------------------
// The body is stock runs interleaved with `${HUMAN_NAME}` markers, so walking
// the marker sequence in order recovers the runs. Two ways that can go wrong,
// both fatal and both detected:
//   * a marker is missing — an edit deleted or renamed a slot; or
//   * a marker string occurs MORE times than there are slots, which makes the
//     greedy walk ambiguous: one of the occurrences is literal text and there is
//     no way to tell which. (Detected by scanning the split runs for leftovers.)
// Either way we refuse rather than guess, and the caller reports a LOST un-nerf.
// Silently mis-splitting would corrupt the bundle at a slot boundary.
export function splitBody(body, identifiers, identifierMap) {
  const markers = identifiers.map((_, i) => renderSlot(identifiers, identifierMap, i));
  const runs = [];
  let pos = 0;
  for (const m of markers) {
    const at = body.indexOf(m, pos);
    if (at < 0) return { error: `slot marker ${m} missing from the edited body` };
    runs.push(body.slice(pos, at));
    pos = at + m.length;
  }
  runs.push(body.slice(pos));
  const leftover = [...new Set(markers)].filter((m) => runs.some((r) => r.includes(m)));
  if (leftover.length) {
    return { error: `ambiguous slot marker(s) [${leftover.join(", ")}] — more occurrences than slots` };
  }
  return { runs };
}

// ---------------------------------------------------------------------------
// Whitespace preservation: strip the edited body's edges, restore the stock
// pieces' leading/trailing whitespace so the surrounding source spacing is kept.
// ---------------------------------------------------------------------------
function edgeWhitespace(pieces) {
  const leading = (pieces[0].match(/^(\s*)/) || ["", ""])[1];
  const last = pieces[pieces.length - 1];
  const trailing = (last.match(/(\s*)$/) || ["", ""])[1];
  return { leading, trailing };
}

// ---------------------------------------------------------------------------
// Render the new canonical text for one matched site.
// Returns { text, runs } | { unchanged } | { skip: reason }.
// ---------------------------------------------------------------------------
function renderPatch(site, mdBody, prompt, version, buildTime) {
  const { pieces, identifiers = [], identifierMap = {} } = prompt;

  // Whitespace preservation: strip the body's edges (editors add and drop
  // trailing newlines), then restore the stock runs' own edge whitespace so the
  // surrounding source spacing is untouched.
  const { leading, trailing } = edgeWhitespace(pieces);
  const trimmed = mdBody.trim();
  const body = trimmed === "" ? "" : leading + trimmed + trailing;

  const split = splitBody(body, identifiers, identifierMap);
  if (split.error) return { skip: split.error };
  // splitBody yields identifiers.length + 1 runs and the site matched this
  // entry's canonical form, so the counts agree by construction. Assert it
  // anyway: a mismatch here would splice text into the wrong run.
  if (split.runs.length !== site.pieces.length) {
    return { skip: `run count mismatch: ${split.runs.length} edited vs ${site.pieces.length} in bundle` };
  }

  // Compare in the SAME version-normalized space the site's key lives in, so a
  // version bump alone never looks like an edit.
  if (canonicalize(split.runs, site.identifiers) === site.key) return { unchanged: true };

  // A quoted literal survives normalization only where a backtick is a syntax
  // error — on the 2.1.219 bundle that is property keys, every one of them.
  // Writing one would rename a property rather than edit a message, so refuse.
  if (site.kind !== "template") {
    return { skip: `only matching site is a quoted literal (a property key, where a backtick is illegal) — not patchable` };
  }

  // <<CCVERSION>> / <<BUILD_TIME>> are normalized INTO the runs at extraction so a
  // version bump isn't a text change; put the real values back on the way out.
  // Substituting AFTER the comparison above keeps a version-only difference from
  // looking like an edit.
  const runs = split.runs.map((r) =>
    r.split("<<CCVERSION>>").join(version).split("<<BUILD_TIME>>").join(buildTime)
  );
  const changed = runs.reduce((n, r, i) => n + (split.runs[i] === site.pieces[i] ? 0 : 1), 0);
  return { text: canonicalize(runs, site.identifiers), runs: changed };
}

// ---------------------------------------------------------------------------
// Distinctive un-nerf marker strings — if the input bundle already contains most
// of these, it was already patched (a re-run), so "stock anchor gone" skips are
// expected rather than lost un-nerfs. Kept in sync with install.sh's sentinel list.
// ---------------------------------------------------------------------------
const UNNERF_SENTINELS = [
  "senior-engineer standard",
  "never trade away rigor, depth, or correctness",
  "Spawn agents whenever parallel investigation",
  "investigate thoroughly, then be direct",
  "thorough, clear, and rich with explanation",
];

// ---------------------------------------------------------------------------
// apply — CLI entry
// ---------------------------------------------------------------------------
function detectVersion(bundle) {
  const m =
    bundle.match(/\/\/\s*Version:\s*(\d+\.\d+\.\d+)/) ||
    bundle.match(/VERSION:"(\d+\.\d+\.\d+)"/) ||
    bundle.match(/\b(\d+\.\d+\.\d+)\b/);
  return m ? m[1] : "unknown";
}
function detectBuildTime(bundle) {
  const m = bundle.match(/BUILD_TIME:"([^"]+)"/);
  return m ? m[1] : "";
}

// The generator must keep comments: the bundle's first line is the
// `// @bun @bytecode @bun-cjs` pragma, and dropping it changes how Bun loads it.
// compact:true keeps the output the same shape as the minified input.
const GEN_OPTS = { compact: true, comments: true };
async function generateSource(ast, source) {
  const mod = await import("@babel/generator");
  const generate = mod.default?.default ?? mod.default ?? mod.generate;
  return generate(ast, GEN_OPTS, source).code;
}

async function apply(inJs, catalogPath, promptsDir, outJs) {
  const source = readFileSync(inJs, "utf8");
  // Snapshot whether the INPUT was already un-nerfed BEFORE we patch anything —
  // checking after would see the un-nerfs we just applied and mislabel a fresh
  // stock run as an already-patched re-run.
  const inputSentinelHits = UNNERF_SENTINELS.filter((s) => source.includes(s)).length;
  const alreadyPatchedInput = inputSentinelHits >= 3; // ≥3 of 5 ⇒ already un-nerfed
  const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
  const version = detectVersion(source);
  const buildTime = detectBuildTime(source);

  const counts = { patched: 0, runs: 0, unchanged: 0, couldNotFind: 0, skipped: 0, lost: 0, dupSites: 0, residual: 0 };

  // Parse ONCE and normalize in memory; index every string-producing node by its
  // canonical text. This is the same call the extractor makes, so the keys here
  // and the catalog's identity hashes are the same bytes by construction.
  let ast;
  try {
    ({ ast } = parseNormalized(source));
  } catch (e) {
    console.error(`ERROR: could not parse the input bundle as JS: ${e.message}`);
    writeFileSync(outJs, source);
    counts.valid = false;
    return counts;
  }
  const sitesByKey = new Map();
  for (const site of collectSites(ast, version)) {
    if (!sitesByKey.has(site.key)) sitesByKey.set(site.key, []);
    sitesByKey.get(site.key).push(site);
  }

  // One entry per (id, matching site) whose .md differs from stock, holding the
  // new canonical text to write onto that site's node.
  const patches = [];
  // Deferred skips (couldNotFind / hard-skip), classified AFTER splicing into
  // BENIGN (edited .md equals stock — a no-op) vs LOST (a real un-nerf that never
  // reached the bundle). A LOST entry is the silent-drop failure mode; it must be
  // loud, never buried among the benign skips.
  const skips = [];

  // The catalog can carry several entries for one id (the same prompt across CC
  // versions). Group by id and use whichever entry's canonical text keys real sites.
  const byId = new Map();
  for (const prompt of catalog.prompts) {
    if (!byId.has(prompt.id)) byId.set(prompt.id, []);
    byId.get(prompt.id).push(prompt);
  }

  const stockText = (e) =>
    reconstruct({ pieces: e.pieces, identifiers: e.identifiers || [], identifierMap: e.identifierMap || {} });

  for (const [id, entries] of byId) {
    const mdPath = join(promptsDir, id + ".md");
    if (!existsSync(mdPath)) continue; // only patch prompts we have an edit for
    const { content } = parseMd(readFileSync(mdPath, "utf8"));

    // A stock .md (== reconstruction) is a no-op — skip it so the ~1300 prompts
    // we don't un-nerf are provably untouched (identical to leaving them alone).
    if (entries.some((e) => stockText(e).trim() === content.trim())) { counts.unchanged++; continue; }

    // Locate: the catalog entry whose canonical text keys an actual site set.
    let hit = null;
    for (const e of entries) {
      const arr = sitesByKey.get(canonicalize(e.pieces || [], e.identifiers || []));
      if (arr && arr.length) { hit = { entry: e, sites: arr }; break; }
    }
    if (!hit) {
      skips.push({ id, entries, content, kind: "couldNotFind", detail: "no matching site in bundle" });
      continue;
    }

    // Queue a write for EVERY matching site, so a prompt reused at several call
    // sites is un-nerfed at all of them.
    let queued = 0;
    let firstSkip = null;
    for (const site of hit.sites) {
      let r;
      try {
        r = renderPatch(site, content, hit.entry, version, buildTime);
      } catch (e) {
        r = { skip: e.message };
      }
      if (r.skip) { firstSkip = firstSkip || r.skip; continue; }
      if (r.unchanged) continue;
      patches.push({ id, entries, content, node: site.node, text: r.text, runs: r.runs });
      queued++;
    }
    if (queued === 0) {
      skips.push({
        id, entries, content,
        kind: firstSkip ? "skipped" : "couldNotFind",
        detail: firstSkip || "matched sites but nothing to change",
      });
    }
  }

  // Conflict guard. Writing a node replaces its whole text, and each site is a
  // distinct node, so the nested-span collisions the old span-splicer had to
  // police cannot occur at all. What CAN still collide is two catalog ids holding
  // identical stock text: they resolve to the SAME nodes. Identical writes are
  // deduped; genuinely contradictory ones drop the whole later patch (a
  // half-applied prompt is worse than an unapplied one) and are reported LOST.
  const claimed = new Map(); // node -> { text, patch }
  const conflicted = new Set();
  for (const patch of patches) {
    const prev = claimed.get(patch.node);
    if (prev) { if (prev.text !== patch.text) conflicted.add(patch); continue; }
    claimed.set(patch.node, patch);
  }
  const accepted = patches.filter((p) => !conflicted.has(p));
  const droppedIds = new Set();
  for (const p of patches) {
    if (!conflicted.has(p) || droppedIds.has(p.id)) continue;
    if (accepted.some((a) => a.id === p.id)) continue; // another site of this id landed
    droppedIds.add(p.id);
    skips.push({ id: p.id, entries: p.entries, content: p.content, kind: "overlap", detail: "every matching site is claimed by another prompt with different text" });
  }

  // dupSites: accepted call-sites beyond the first per id (a reused prompt un-nerfed
  // at every site). This is where "duplicates encoded differently" all land — after
  // normalization they share one canonical text, so every spelling is patched.
  const perId = {};
  for (const p of accepted) perId[p.id] = (perId[p.id] || 0) + 1;
  counts.dupSites = Object.values(perId).reduce((a, n) => a + Math.max(0, n - 1), 0);
  const reused = Object.entries(perId).filter(([, n]) => n > 1);
  if (reused.length) {
    console.error(
      `  [info] patched ${counts.dupSites} additional call-site(s) of ${reused.length} reused prompt(s): ` +
        reused.map(([id, n]) => `${id}×${n}`).join(", ")
    );
  }

  // Write the tree. `setNodeText` rebuilds the node's quasis from the new runs
  // and rebinds the node's OWN interpolations positionally, so the stock variables
  // are restored in place and an edit that drops or reorders a slot throws here
  // instead of silently wiring the prompt to the wrong value.
  const wroteText = new Set();
  // The stock text each successful write displaced. Duplicate call-sites make
  // "the new text is present" too weak a proof: if one of N sites is missed, its
  // siblings still carry the new text and the presence check passes while a stock
  // copy survives in the bundle. So we also require every displaced text to be
  // GONE. Raw canonical text per node, not site.key — keys are version-normalized
  // and live in a different space than what verifyOutput reads back.
  const stockGone = new Map();
  const failedWrite = [];
  for (const p of accepted) {
    try {
      const before = canonicalText(p.node);
      setNodeText(p.node, p.text);
      if (before !== p.text) stockGone.set(before, p.id);
      wroteText.add(p.text);
      counts.runs += p.runs;
    } catch (e) {
      failedWrite.push(p);
      skips.push({ id: p.id, entries: p.entries, content: p.content, kind: "skipped", detail: `could not write node: ${e.message}` });
    }
  }
  counts.patched = accepted.length - failedWrite.length;

  // De-normalize before emitting: the normal form is an in-memory device, and
  // engine/apply-code-patches.mjs (which runs next, on this output) anchors its
  // effort un-nerfs on quoted string-literal contracts. See normalize-ast.mjs.
  denormalizeProgram(ast);
  const out = await generateSource(ast, source);
  writeFileSync(outJs, out);

  // Classify every deferred skip by severity (BENIGN vs LOST vs already-patched
  // input). Detecting an already-patched input globally (via un-nerf sentinels,
  // snapshotted from the INPUT) is robust: on stock, 0 sentinels ⇒ a real un-nerf
  // that didn't splice is genuinely LOST; on a patched re-run, the flood of "stock
  // anchor gone" is expected, not a regression.
  const isStockMd = (rec) => rec.entries.some((e) => stockText(e).trim() === rec.content.trim());
  const benign = [];
  const applied = [];
  const lost = [];
  for (const s of skips) {
    if (isStockMd(s)) benign.push(s);
    else if (alreadyPatchedInput) applied.push(s);
    else lost.push(s);
  }
  counts.couldNotFind = skips.filter((s) => s.kind === "couldNotFind").length;
  counts.skipped = skips.length - counts.couldNotFind;

  // Safety gate: re-read the EMITTED bundle and prove it (a) parses, (b) is still
  // pure ASCII, and (c) actually contains every text we wrote. (a) catches a bad
  // escape that would brick the binary at boot; (b) catches a non-ASCII identifier
  // regenerated raw, which Bun rejects with `Invalid character` at load; (c) is the
  // end-to-end proof that an un-nerf reached the FILE, not merely a node in memory.
  const check = await verifyOutput(out, wroteText, stockGone);
  counts.valid = check.valid;
  for (const t of check.missing) {
    const p = accepted.find((a) => a.text === t);
    if (p) lost.push({ id: p.id, kind: "vanished", detail: "written to the node but absent from the emitted bundle" });
  }
  // A displaced stock text still in the bundle means some call-site of a patched
  // prompt kept its stock wording — a HALF-un-nerfed prompt, which the presence
  // check above cannot see because the patched siblings satisfy it.
  counts.residual = check.residual.length;
  for (const t of check.residual) {
    lost.push({ id: stockGone.get(t), kind: "partial", detail: "patched at some call-site(s) but a stock copy survives at another" });
  }
  counts.lost = lost.length;

  if (lost.length) {
    console.error(`\n  ==================== ${lost.length} UN-NERF(S) FAILED TO SPLICE ====================`);
    console.error(`  The edited .md differs from stock but was NOT applied to the bundle — these`);
    console.error(`  un-nerfs are MISSING from the patched binary. Fix the catalog pieces / rule anchor:`);
    for (const s of lost) console.error(`    [LOST] ${s.id}: ${s.kind} — ${s.detail}`);
    console.error(`  ===============================================================================`);
  }
  if (applied.length) {
    console.error(
      `  [info] input bundle is ALREADY un-nerfed (${inputSentinelHits}/${UNNERF_SENTINELS.length} sentinels present):` +
        ` ${applied.length} un-nerf(s) have no stock anchor left to match — expected on a re-run. Reinstall stock` +
        ` CC (npm i -g @anthropic-ai/claude-code@<ver>) before re-patching for a clean apply. Nothing lost.`
    );
  }
  if (benign.length) {
    console.error(
      `  [info] ${benign.length} stock prompt(s) not re-spliced — we don't un-nerf these and they aren't` +
        ` uniquely locatable in the bundle, so leaving the stock text is a correct no-op (harmless).`
    );
  }

  console.log(`version=${version} buildTime=${buildTime}`);
  console.log(
    `patched=${counts.patched} runs=${counts.runs} unchanged=${counts.unchanged} couldNotFind=${counts.couldNotFind} skipped=${counts.skipped} lost=${counts.lost} dupSites=${counts.dupSites} residual=${counts.residual}`
  );
  console.log(`wrote ${outJs} (${Buffer.byteLength(out)} bytes)`);
  return counts;
}

// Parse the emitted bundle back and confirm it is loadable AND carries every
// patched text. Fails CLOSED: anything we cannot check is treated as not valid,
// because a broken bundle must never reach repack certified.
async function verifyOutput(js, expectedTexts, displacedTexts = new Map()) {
  const nonAscii = Buffer.from(js, "utf8").filter((b) => b > 0x7f).length;
  if (nonAscii) {
    // Bun reads a raw non-ASCII byte in the standalone container as an invalid
    // character and refuses to boot — measured, not theoretical.
    console.error(`ERROR: patched output contains ${nonAscii} non-ASCII byte(s); the stock bundle is pure ASCII and Bun rejects them`);
    return { valid: false, missing: [] };
  }
  let ast;
  try {
    ({ ast } = parseNormalized(js));
  } catch (e) {
    console.error(`ERROR: patched output is NOT valid JS: ${e.message}`);
    if (typeof e.pos === "number") console.error(`  near: ${JSON.stringify(js.slice(e.pos - 80, e.pos + 20))}`);
    return { valid: false, missing: [], residual: [] };
  }
  // RAW canonical text here, not the extractor's version-normalized view: what we
  // wrote carries the real version string, so normalizing it again would compare
  // two different spaces.
  const present = new Set();
  for (const n of collectStringNodes(ast)) present.add(n.text);
  const missing = [...expectedTexts].filter((t) => !present.has(t));
  const residual = [...displacedTexts.keys()].filter((t) => present.has(t));
  console.log(
    `validate: output parses OK, pure ASCII, ${expectedTexts.size - missing.length}/${expectedTexts.size} patched text(s) present, ` +
      `${displacedTexts.size - residual.length}/${displacedTexts.size} displaced stock text(s) gone`
  );
  return { valid: true, missing, residual };
}

// ---------------------------------------------------------------------------
import { pathToFileURL } from "node:url";
// realpath argv[1] before comparing — import.meta.url is symlink-resolved by
// Node's loader, argv[1] isn't (e.g. macOS's /tmp -> /private/tmp), so a raw
// comparison silently skips main() while still exiting 0 when run through one.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href;
if (isMain) {
  // Parsing an 18 MB minified bundle recurses deep; a bigger stack (set only at
  // process start) avoids a stack overflow on the deepest expression chains.
  if (process.env.UNNERF_BIGSTACK !== "1") {
    const { spawnSync } = await import("node:child_process");
    const r = spawnSync(process.execPath, ["--stack-size=4000", process.argv[1], ...process.argv.slice(2)], {
      stdio: "inherit",
      env: { ...process.env, UNNERF_BIGSTACK: "1" },
    });
    process.exit(r.status ?? 1);
  }
  const argv = process.argv.slice(2);
  if (argv[0] === "apply" && argv.length === 5) {
    apply(argv[1], argv[2], argv[3], argv[4]).then((counts) => {
      if (counts && counts.valid === false) process.exit(2);
      if (counts && counts.lost > 0) process.exit(3); // a real un-nerf never reached the bundle
    });
  } else {
    console.error("usage: node patch-prompts.mjs apply <inJs> <catalog.json> <systemPromptsDir> <outJs>");
    process.exit(1);
  }
}

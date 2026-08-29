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
// MULTI-MODULE (as of v2.1.251): <inJs>/<outJs> are directories produced by /
// consumed by `engine/bun-binary.mjs unpack`/`repack` — one file per Bun
// module rather than a single bundle. Every module is parsed independently;
// string-producing nodes from ALL of them are pooled into one lookup so an id
// is "found" if it matches a site in ANY module, and only regenerated/written
// back for whichever specific modules actually received a patch (typically
// ~100 of ~1800). See apply()'s body for why the LOST-detection gate has to
// be pooled first rather than run per-module independently.
//
// CLI:
//   node patch-prompts.mjs apply <inJsDir> <catalog.json> <systemPromptsDir> <outJsDir>

import { readFileSync, writeFileSync, existsSync, realpathSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { parseNormalized, collectSites, isMarkdownAssetPath, normalizeVersion } from "./extract-prompts.mjs";
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

// Whole-file markdown-asset analog of renderPatch: no slots to rebind (a
// markdown site's identifiers is always []), so splitBody's positional-slot
// machinery doesn't apply — the edited .md body simply IS the new file
// content, once its edge whitespace is restored and <<CCVERSION>>/
// <<BUILD_TIME>> placeholders (normalized IN at extraction) are substituted
// back to the real values, same as renderPatch does for a JS site.
//
// ASCII: deliberately NOT escaped here. Confirmed empirically (2026-08-29,
// real v2.1.251 binary) that Bun's pure-ASCII requirement is specific to
// modules it parses as JavaScript — a markdown asset module boots fine with
// raw non-ASCII bytes (an em-dash round-tripped byte-for-byte through
// unpack -> repack -> boot). encodeQuoted()/escapeCommon() exist ONLY because
// a JS string literal has to survive re-parsing as source; a markdown file
// has no such constraint, so the un-nerf .md's natural UTF-8 text (em-dashes
// included) is written verbatim.
//
// site.key is in canonicalize()'s ESCAPED space (see the sitesByKey comment
// above), but `body` here is raw — comparing them directly would report
// "changed" even on a genuine no-op whenever the file contains a literal
// `\` or `${` (a code example inside a SKILL.md, say). Route the comparison
// through canonicalize() too; the RETURNED text stays raw regardless, since
// that escaping exists only to protect slot-marker splitting on
// reconstruction — irrelevant here (identifiers is always [], nothing ever
// splits this body back apart) — and writing the escaped form verbatim would
// corrupt the file with literal backslash-doubling.
function renderPatchMarkdown(site, mdBody, version, buildTime) {
  const { leading, trailing } = edgeWhitespace(site.pieces);
  const trimmed = mdBody.trim();
  const body = trimmed === "" ? "" : leading + trimmed + trailing;

  if (canonicalize([body], []) === site.key) return { unchanged: true };

  const text = body.split("<<CCVERSION>>").join(version).split("<<BUILD_TIME>>").join(buildTime);
  return { text, runs: 1 };
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

async function apply(inJsDir, catalogPath, promptsDir, outJsDir) {
  const manifestPath = join(inJsDir, "manifest.json");
  if (!existsSync(manifestPath)) {
    console.error(`ERROR: manifest.json not found in ${inJsDir} — was this produced by 'bun-binary.mjs unpack'?`);
    return { valid: false };
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

  // Parse every module we can. Native binaries, HTML assets, and other non-JS,
  // non-markdown content throw here — expected for a meaningful fraction of
  // ~1800 modules — and are simply never patchable, never touched again.
  // v2.1.251+: .md/.txt asset modules (SKILL bodies, README/reference docs,
  // system-prompt fragments moved out of JS — see extract-prompts.mjs's
  // isMarkdownAssetPath) get no AST at all; they're patched whole-file, by a
  // separate path below (they have no string-producing NODE to mutate — the
  // entire module IS the prompt).
  const modules = []; // { index, relPath, source, ast? , isMarkdown? }
  for (const entry of manifest.modules) {
    const source = readFileSync(join(inJsDir, entry.relPath), "utf8");
    if (isMarkdownAssetPath(entry.relPath)) {
      modules.push({ index: entry.index, relPath: entry.relPath, source, isMarkdown: true });
      continue;
    }
    let ast;
    try { ({ ast } = parseNormalized(source)); } catch { continue; }
    modules.push({ index: entry.index, relPath: entry.relPath, source, ast });
  }

  // Snapshot whether the INPUT was already un-nerfed BEFORE we patch anything,
  // across ALL modules combined (a sentinel can legitimately live in any one
  // of them) — checking after would see the un-nerfs we just applied and
  // mislabel a fresh stock run as an already-patched re-run.
  const foundSentinels = new Set();
  for (const m of modules) for (const s of UNNERF_SENTINELS) if (m.source.includes(s)) foundSentinels.add(s);
  const inputSentinelHits = foundSentinels.size;
  const alreadyPatchedInput = inputSentinelHits >= 3; // ≥3 of 5 ⇒ already un-nerfed

  const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
  const entryModule = modules.find((m) => m.index === manifest.entryPointId);
  const versionSource = entryModule ? entryModule.source : (modules[0]?.source || "");
  const version = detectVersion(versionSource);
  const buildTime = detectBuildTime(versionSource);

  const counts = { patched: 0, runs: 0, unchanged: 0, couldNotFind: 0, skipped: 0, lost: 0, dupSites: 0, residual: 0 };

  // Pool EVERY module's string-producing nodes into one map, each site tagged
  // with which module it came from. This is what makes the LOST-detection gate
  // below correct across ~1800 separate files: an id whose canonical text
  // matches a site in module #123 is FOUND, even though modules #0-122 and
  // #124+ never saw it. Calling a single-file version of this function once
  // per module (the naive approach) would have no way to express "not here,
  // but found elsewhere" and would misclassify nearly every id as LOST in
  // every module it doesn't happen to live in.
  const sitesByKey = new Map();
  for (const m of modules) {
    if (m.isMarkdown) {
      // A whole-file markdown prompt has exactly one "site": the entire
      // module. No node, no slots. `pieces` holds the RAW (version-
      // normalized, unescaped) content — same convention collectSites uses
      // for a JS site's pieces — while `key` runs it through canonicalize()
      // (which additionally escapes literal `\`/`${` runs) because THAT is
      // what identityHash/gen-catalog.mjs's extraction key entries by; the
      // two must use the identical transform or a markdown file containing
      // its own literal `${` (a code example inside a SKILL.md, say) would
      // never match its own catalog entry. escaping exists to protect slot-
      // marker splitting on reconstruction, which a zero-slot whole-file
      // prompt never does — so it is ONLY for this key comparison, never
      // applied to the text that actually gets written back (see
      // renderPatchMarkdown).
      const raw = normalizeVersion(m.source, version);
      const key = canonicalize([raw], []);
      const site = { module: m.index, isMarkdown: true, pieces: [raw], identifiers: [], key };
      if (!sitesByKey.has(key)) sitesByKey.set(key, []);
      sitesByKey.get(key).push(site);
      continue;
    }
    for (const site of collectSites(m.ast, version)) {
      site.module = m.index;
      if (!sitesByKey.has(site.key)) sitesByKey.set(site.key, []);
      sitesByKey.get(site.key).push(site);
    }
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
        // A markdown site has no AST node — the whole module IS the prompt,
        // so it needs the simpler whole-file analog, not the slot-rebinding
        // machinery a JS template literal's node requires.
        r = site.isMarkdown
          ? renderPatchMarkdown(site, content, version, buildTime)
          : renderPatch(site, content, hit.entry, version, buildTime);
      } catch (e) {
        r = { skip: e.message };
      }
      if (r.skip) { firstSkip = firstSkip || r.skip; continue; }
      if (r.unchanged) continue;
      // Markdown patches have no real AST node to key conflict-detection on
      // (claimed/conflicted below is a Map keyed by `node`, and a Map key just
      // needs to be stable + unique — a per-module sentinel string does the
      // same job a node reference does for the JS path) or to pass to
      // setNodeText, so isMarkdown routes both the conflict-guard and the
      // write step below to the whole-file path instead.
      const node = site.isMarkdown ? `__markdown_module_${site.module}__` : site.node;
      patches.push({ id, entries, content, node, module: site.module, text: r.text, runs: r.runs, isMarkdown: !!site.isMarkdown });
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
  //
  // wroteText/stockGone are bucketed PER MODULE (not global): verifyOutput
  // re-parses one module's own emitted output, so "is this text present" only
  // means something checked against the module it was actually written to —
  // checking a global set against one module's output would report every text
  // written to any OTHER module as falsely missing.
  const wroteTextByModule = new Map(); // moduleIndex -> Set<text>
  // The stock text each successful write displaced. Duplicate call-sites make
  // "the new text is present" too weak a proof: if one of N sites is missed, its
  // siblings still carry the new text and the presence check passes while a stock
  // copy survives in the bundle. So we also require every displaced text to be
  // GONE. Raw canonical text per node, not site.key — keys are version-normalized
  // and live in a different space than what verifyOutput reads back.
  const stockGoneByModule = new Map(); // moduleIndex -> Map<stockText, id>
  // Markdown modules have no AST node to mutate — the whole file's NEW
  // content, tracked here and written verbatim below instead of going
  // through denormalizeProgram/generateSource.
  const markdownContentByModule = new Map(); // moduleIndex -> newContent
  const failedWrite = [];
  for (const p of accepted) {
    try {
      if (p.isMarkdown) {
        // sitesByKey's markdown entry stores the ORIGINAL (version-normalized)
        // file content as its own key — that IS "before" here, since there's
        // no AST node to read it back from with canonicalText().
        const before = modules.find((m) => m.index === p.module) && normalizeVersion(modules.find((m) => m.index === p.module).source, version);
        if (!wroteTextByModule.has(p.module)) { wroteTextByModule.set(p.module, new Set()); stockGoneByModule.set(p.module, new Map()); }
        if (before !== p.text) stockGoneByModule.get(p.module).set(before, p.id);
        wroteTextByModule.get(p.module).add(p.text);
        markdownContentByModule.set(p.module, p.text);
        counts.runs += p.runs;
        continue;
      }
      const before = canonicalText(p.node);
      setNodeText(p.node, p.text);
      if (!wroteTextByModule.has(p.module)) { wroteTextByModule.set(p.module, new Set()); stockGoneByModule.set(p.module, new Map()); }
      if (before !== p.text) stockGoneByModule.get(p.module).set(before, p.id);
      wroteTextByModule.get(p.module).add(p.text);
      counts.runs += p.runs;
    } catch (e) {
      failedWrite.push(p);
      skips.push({ id: p.id, entries: p.entries, content: p.content, kind: "skipped", detail: `could not write node: ${e.message}` });
    }
  }
  counts.patched = accepted.length - failedWrite.length;

  // Regenerate + write + verify ONLY the modules that actually received a
  // patch — the common case is ~100 of ~1800, so the other ~1700 never need a
  // babel-generator pass or a file write; repackFromDir keeps their original
  // bytes untouched when it finds nothing for them in outJsDir.
  mkdirSync(outJsDir, { recursive: true });
  // Carry the manifest forward unchanged (module list/index/relPath/wasZstd never
  // change here, only the content of a few files does) — both apply-code-patches.mjs
  // (next stage, via loadModules()) and repackFromDir (final stage) require
  // <dir>/manifest.json to exist, and neither falls back to inJsDir's copy.
  writeFileSync(join(outJsDir, "manifest.json"), JSON.stringify(manifest, null, 1));
  let allValid = true, modulesWritten = 0, bytesWritten = 0;
  const missingTexts = [], residualTexts = [];
  for (const m of modules) {
    const wroteText = wroteTextByModule.get(m.index);
    if (!wroteText || wroteText.size === 0) continue;
    let out, check;
    if (m.isMarkdown) {
      // Whole-file write: no AST, no babel generation, no ASCII check (a
      // markdown asset isn't parsed as JS by Bun's reader at all — see
      // renderPatchMarkdown's header comment for the empirical confirmation).
      out = markdownContentByModule.get(m.index);
      check = verifyMarkdownOutput(out, wroteText, stockGoneByModule.get(m.index));
    } else {
      // De-normalize before emitting: the normal form is an in-memory device, and
      // engine/apply-code-patches.mjs (which runs next, on this output) anchors its
      // effort un-nerfs on quoted string-literal contracts. See normalize-ast.mjs.
      denormalizeProgram(m.ast);
      out = await generateSource(m.ast, m.source);
      // Safety gate: re-read THIS module's emitted output and prove it (a) parses,
      // (b) is still pure ASCII, and (c) actually contains every text we wrote to
      // it. (a) catches a bad escape that would brick the binary at boot; (b)
      // catches a non-ASCII identifier regenerated raw, which Bun rejects with
      // `Invalid character` at load; (c) is the end-to-end proof that an un-nerf
      // reached the FILE, not merely a node in memory.
      check = await verifyOutput(out, wroteText, stockGoneByModule.get(m.index));
    }
    const outPath = join(outJsDir, m.relPath);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, out);
    modulesWritten++;
    bytesWritten += Buffer.byteLength(out);

    allValid = allValid && check.valid;
    for (const t of check.missing) missingTexts.push(t);
    for (const t of check.residual) residualTexts.push({ text: t, id: stockGoneByModule.get(m.index).get(t) });
  }
  counts.valid = allValid;

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

  for (const t of missingTexts) {
    const p = accepted.find((a) => a.text === t);
    if (p) lost.push({ id: p.id, kind: "vanished", detail: "written to the node but absent from the emitted bundle" });
  }
  // A displaced stock text still in the bundle means some call-site of a patched
  // prompt kept its stock wording — a HALF-un-nerfed prompt, which the presence
  // check above cannot see because the patched siblings satisfy it.
  counts.residual = residualTexts.length;
  for (const r of residualTexts) {
    lost.push({ id: r.id, kind: "partial", detail: "patched at some call-site(s) but a stock copy survives at another" });
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
  console.log(`wrote ${modulesWritten} module(s) to ${outJsDir} (${bytesWritten} bytes total)`);
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

// Whole-file markdown-asset analog of verifyOutput. No JS parse (there's no
// AST — the module's entire content is the "output" being verified) and no
// ASCII check: confirmed empirically (2026-08-29, real v2.1.251 binary) that
// Bun's pure-ASCII boot requirement is specific to modules it parses as
// JavaScript, not a whole-binary constraint — an em-dash injected directly
// into a markdown asset module round-tripped through unpack -> repack ->
// boot without issue. The "is the new text present / is stock gone" checks
// still apply and mean exactly what they do for the JS path — just against a
// one-element "present" set, since a whole-file prompt has exactly one site.
function verifyMarkdownOutput(text, expectedTexts, displacedTexts = new Map()) {
  const present = new Set([text]);
  const missing = [...expectedTexts].filter((t) => !present.has(t));
  const residual = [...displacedTexts.keys()].filter((t) => present.has(t));
  console.log(
    `validate: markdown asset, ${expectedTexts.size - missing.length}/${expectedTexts.size} patched text(s) present, ` +
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
    console.error("usage: node patch-prompts.mjs apply <inJsDir> <catalog.json> <systemPromptsDir> <outJsDir>");
    process.exit(1);
  }
}

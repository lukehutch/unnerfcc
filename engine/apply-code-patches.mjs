#!/usr/bin/env node
// apply-code-patches.mjs — unnerfcc's BEST-EFFORT in-code un-nerfs (effort/model
// caps [P0–P3] + a brevity cap upstream relocated from prompt text into code [P4]).
//
// CHARTER: unnerfcc never lets thoroughness be silently degraded. The primary
// case is reasoning-effort: Anthropic increasingly downgrades effort to save
// server load (a mid-tier default on the flagship model, a persisted-effort cap
// below the model's ceiling) rather than fix scalability, and P0–P3 lift those
// silent caps — the ONLY effort levers a local binary patch can reach (model
// downgrades pushed via server-side Statsig config, e.g. the auto-mode
// classifier, are out of reach and documented as such, not silently "handled").
// The secondary case (P4): a brevity nerf we lifted at the PROMPT layer that
// upstream then MOVED into a JS generator, putting it out of the prompt layer's
// reach — the same class of silent degradation, so it belongs here too.
//
// These are NON-PROMPT patches: they edit CC's own code/data strings in the
// extracted JS bundle, not model-facing prompt text. They are deliberately
// SECOND-TIER and BEST-EFFORT: install.sh / upgrade.sh run them AFTER the prompt
// un-nerfs, on the already-prompt-patched bundle, and a failure here NEVER blocks
// or reverts the prompt patches — it logs a specific, actionable warning and the
// bundle ships with prompt un-nerfs intact + stock effort.
//
// ROBUSTNESS ACROSS FUTURE CC CHANGES
// -----------------------------------
// Every anchor is a STRING-LITERAL CONTRACT — the effort vocabulary
// ("low"/"medium"/"high"/"xhigh"/"max") and the `default_effort` field name —
// never a minified symbol or a code shape. Minification renames symbols and
// Anthropic keeps restructuring the effort resolver (function → inlined memo →
// data-driven catalog); string literals survive all of that. Each patch is:
//   - idempotent (re-run is a no-op → status "already"),
//   - self-verifying (asserts its intended end-state; a match that produced the
//     wrong bytes is a "failed", not a false "applied"),
//   - independent (one patch failing doesn't affect the others),
//   - fail-open to SAFE (a missing anchor leaves stock behavior, never worse).
// `posture()` snapshots the effort surface so upgrade.sh can DIFF it and surface
// drift (a renamed field, a restructured enum) as a loud worklist instead of a
// silent regression — the same idea as the prompt-checksum manifest.
//
// MODEL-AGNOSTIC BY DESIGN (Fable 5, Opus 4.8, and every future model)
// -------------------------------------------------------------------
// Nothing here names a model. The floor keys on the `default_effort` field and
// the raise is kept safe by CC's OWN per-model capability guard, which decides
// max-support from a `max_effort`/`xhigh_effort` CAPABILITY on the model's
// catalog entry (functions `NDe`/`Coe`: `capabilities.includes("max_effort")`,
// with an explicit OLD-model blocklist) — never a hardcoded model id. So the
// moment Anthropic ships a new max-capable model, it inherits the floor with no
// change here. Verified against the real Claude Code v2.1.219 bundle: Sonnet 5,
// Opus 4.8, Opus 5 and Fable 5 all carry `default_effort:"high"` + the
// `max_effort` capability, so P1 floors each to a genuine "max"; Opus 4.7 carries
// `default_effort:"xhigh"` (also max-capable) — see P0/P1 for how that is raised
// safely too. That is FIVE model-default sites at v2.1.219, up from four at
// v2.1.201 — Opus 5 is the new one, and it inherited the floor with no code
// change here, which is the whole point of keying on the field not the model id.
// Worth noting for the record: Opus 4.7 shipped `default_effort:"xhigh"` and both
// Opus 4.8 and Opus 5 stepped the flagship default back DOWN to "high".
//
// THE PATCHES
//   P0  Make the raise REGRESSION-PROOF for ANY starting default. CC's resolver
//       guards an unsupported "max" with `if(eff==="max"&&!NDe(model))eff="high"`
//       — it drops straight to "high", skipping "xhigh". That's why floring a
//       model whose stock default is "xhigh" would be unsafe (an xhigh-capable-
//       but-not-max model would regress xhigh->high). P0 rewrites that fallback
//       to "xhigh"; the resolver's very next line (`if(eff==="xhigh"&&!Coe(m))
//       eff="high"`) then completes the cascade. Net: an unsupported "max"
//       degrades max -> xhigh -> high by true capability, so raising ANY default
//       to "max" can never land a model below its stock effort.
//   P1  Floor the model default effort to "max": `default_effort:"high"` AND
//       `default_effort:"xhigh"` -> `"max"`. The "high" raise is always safe (an
//       unsupported max falls to "high" = stock). The "xhigh" raise is applied
//       ONLY when P0's cascade is present (else it is SKIPPED, fail-safe, so a
//       future xhigh-default model is never regressed). This covers future Opus
//       whether it ships a "high" default (like Opus 4.8) or an "xhigh" default
//       (like Opus 4.7). Also defeats the "launch-effort pin" nerf (a fresh
//       Opus/Fable session resolves to the model default, ignoring persisted
//       effort): the default it resolves to is now "max".
//       NOTE (honest scope): the real REQUEST path resolves through the guarded
//       resolver `nQ` (P0's site). A separate DISPLAY-layer reader (`Uqo`->`VEe`)
//       reads the raw default without the capability guard, so a hypothetical
//       future model that can't support its own raised default could show "max"
//       cosmetically; the effort actually sent stays guarded. In practice a
//       model's stock default is always within its capability ceiling, so this
//       is inert for every real model.
//   P2  Uncap the persisted /effort setting: the settings-schema enum
//       ["low","medium","high","xhigh"] -> add "max" (stock omits it, so /effort
//       and CLAUDE_CODE_EFFORT_LEVEL can't persist max).
//   P3  Accept "max" in the /effort validator: the low||medium||high||xhigh
//       chain -> also accept "max" (belt-and-braces with P2).
//
// CLI
//   node apply-code-patches.mjs apply   <origJsDir> <inJsDir> <outJsDir> [--posture-out FILE]
//   node apply-code-patches.mjs posture <jsDir>
//   node apply-code-patches.mjs verify  <jsDir>   # exit 0 iff all patches present
//
// MULTI-MODULE (v2.1.251+): <jsDir>/<inJsDir>/<outJsDir> are directories of one
// file per Bun module (see engine/bun-binary.mjs unpack), not a single bundle.
// The patches here are plain regex-over-text (no AST), so every module's raw
// text can be scanned directly — no parse step, nothing throws on non-JS
// content, it just never matches. posture() is naturally additive/OR-able
// across modules (its fields are match COUNTS and boolean presence checks),
// so posture/verify sum/OR-merge it across every module in <jsDir> — always a
// pristine unpack (every module physically present), since upgrade.sh only
// ever calls posture on the fresh, pre-patch bundle.
//
// applyCodePatches() is different: P0-P4 are sequential and interdependent
// (P1 checks P0's own output), which only makes sense run against whichever
// ONE module actually holds the effort-configuration code — so apply finds
// that module (the first one where at least one of the 5 named patches, not
// the separate ascii-invariant check, reports a detail that does not start
// with "anchor MISSING:", the literal marker every patch uses for "not found
// here") and patches only it, leaving every other module untouched.
//
// apply takes THREE directories, not two, because it runs downstream of
// patch-prompts.mjs's sparse output: <origJsDir> is the pristine unpack (used
// to search all ~1800 modules for the one effort module), <inJsDir> is
// patch-prompts.mjs's outJsDir (manifest + only the modules it changed), and
// <outJsDir> gets the union of both — every module already carried in
// <inJsDir>, plus this stage's own patched module — because outJsDir is the
// last stop before repackFromDir, which only ever consults ONE directory.

import { readFileSync, writeFileSync, existsSync, realpathSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
// The SAME canonicaliser the AST stage writes string literals with. Sharing it is
// the point: text inserted here is then spelled exactly as a regenerated bundle
// would spell it, so it survives the next run's parse -> generate unchanged.
// normalize-ast.mjs has no imports of its own, so this stays dependency-free.
import { encodeQuoted } from "./normalize-ast.mjs";

// The resolver's max-unsupported fallback, matched by string-literal shape (not
// symbol): `X==="max"&&!F(Y))X="high"`. GUARD_STOCK is the stock "drop to high"
// form P0 rewrites; GUARD_CASCADED is the P0-applied "drop to xhigh" form (which
// the resolver's next line then cascades xhigh->high by capability). Var/fn names
// are minified and version-specific, so they are captured, never hardcoded.
const GUARD_STOCK = /(([$\w]+)==="max"&&![$\w]+\([$\w]+\)\))\2="high"/;
const GUARD_CASCADED = /(([$\w]+)==="max"&&![$\w]+\([$\w]+\)\))\2="xhigh"/;

// --- posture snapshot (for drift detection) ---------------------------------
export function posture(js) {
  const count = (re) => (js.match(re) || []).length;
  return {
    defaultEffort: {
      high: count(/default_effort:"high"/g),
      xhigh: count(/default_effort:"xhigh"/g),
      max: count(/default_effort:"max"/g),
    },
    // the persisted-effort setting enum, capped (no "max") vs uncapped
    effortEnumCapped: count(/\["low","medium","high","xhigh"\]/g),
    effortEnumUncapped: count(/\["low","medium","high","xhigh","max"\]/g),
    // the /effort validator chain, capped vs accepting "max"
    validatorCapped: count(/==="low"\|\|[$\w]+==="medium"\|\|[$\w]+==="high"\|\|[$\w]+==="xhigh"\)return/g),
    // the resolver's max-unsupported fallback: "high" (stock, uncascaded),
    // "xhigh" (P0-applied cascade), or "unknown" (guard shape changed).
    maxFallback: GUARD_CASCADED.test(js) ? "xhigh" : (GUARD_STOCK.test(js) ? "high" : "unknown"),
    // the runtime capability guard we rely on for P0/P1 safety
    capGuardPresent: GUARD_STOCK.test(js) || GUARD_CASCADED.test(js),
  };
}

// Merge per-module posture() snapshots into one, for the multi-module CLI
// paths. Every field here is a match COUNT (additive) or a boolean/enum
// presence check (OR-able) — see posture()'s own fields — so this is exact,
// not an approximation: it reproduces byte-for-byte what posture() would
// report if all modules' text were still one bundle.
export function mergePosture(postures) {
  const merged = {
    defaultEffort: { high: 0, xhigh: 0, max: 0 },
    effortEnumCapped: 0, effortEnumUncapped: 0, validatorCapped: 0,
    maxFallback: "unknown", capGuardPresent: false,
  };
  for (const p of postures) {
    merged.defaultEffort.high += p.defaultEffort.high;
    merged.defaultEffort.xhigh += p.defaultEffort.xhigh;
    merged.defaultEffort.max += p.defaultEffort.max;
    merged.effortEnumCapped += p.effortEnumCapped;
    merged.effortEnumUncapped += p.effortEnumUncapped;
    merged.validatorCapped += p.validatorCapped;
    if (p.maxFallback === "xhigh") merged.maxFallback = "xhigh";
    else if (p.maxFallback === "high" && merged.maxFallback === "unknown") merged.maxFallback = "high";
    merged.capGuardPresent = merged.capGuardPresent || p.capGuardPresent;
  }
  return merged;
}

// --- the patches ------------------------------------------------------------
// Each: apply(js) -> { js, status: "applied"|"already"|"failed", detail }.
// A patch must NEVER throw out of here; it catches its own errors and reports.

// P0 — cascade the resolver's max-unsupported fallback "high" -> "xhigh" so that
// raising ANY starting default to "max" is regression-proof (see header). Runs
// BEFORE P1 so P1 can gate its "xhigh" raise on the cascade being in place.
function p0_cascadeMaxFallback(js) {
  try {
    if (GUARD_CASCADED.test(js)) {
      return { js, status: "already", detail: `resolver already cascades an unsupported "max" to "xhigh"` };
    }
    const m = js.match(GUARD_STOCK);
    if (!m) {
      return {
        js, status: "failed",
        detail: `anchor MISSING: resolver guard \`X==="max"&&!F(Y))X="high"\` not found — CC's effort resolver likely changed; cascade NOT applied (P1 will conservatively SKIP raising "xhigh" defaults; "high" defaults are still floored safely)`,
      };
    }
    const out = js.replace(GUARD_STOCK, `${m[1]}${m[2]}="xhigh"`);
    if (!GUARD_CASCADED.test(out)) return { js, status: "failed", detail: `verify failed: cascade fallback not present after patch` };
    return { js: out, status: "applied", detail: `resolver now degrades an unsupported "max" by capability (max -> xhigh -> high) instead of straight to "high" — makes flooring any default to "max" regression-proof` };
  } catch (e) {
    return { js, status: "failed", detail: `P0 threw: ${e.message}` };
  }
}

// P1 — floor model default_effort to "max". "high" is always safe; "xhigh" is
// raised only when P0's cascade is present (else SKIPPED, fail-safe). See header.
//
// opts.cascadeAppliedElsewhere: MULTI-MODULE — P0's cascade guard and P1's
// default_effort fields can land in different Bun chunks (confirmed on
// v2.1.251: they do), so a purely local GUARD_CASCADED.test(js) can read
// "absent" even though P0 genuinely applied elsewhere in the same bundle.
// The multi-module orchestrator resolves this GLOBALLY first (one scan of
// every module) and passes the answer in here, rather than this function
// trying to see across file boundaries itself.
function p1_floorDefaultEffort(js, opts = {}) {
  try {
    if (!/default_effort:"[a-z]+"/.test(js)) {
      return { js, status: "failed", detail: `anchor MISSING: no \`default_effort:"..."\` field found — CC's model catalog likely changed its effort-default shape; effort floor NOT applied` };
    }
    const nHigh = (js.match(/default_effort:"high"/g) || []).length;
    const nXhigh = (js.match(/default_effort:"xhigh"/g) || []).length;
    const cascadeSafe = GUARD_CASCADED.test(js) || !!opts.cascadeAppliedElsewhere;

    let out = js;
    const raised = [];
    if (nHigh > 0) { out = out.replace(/default_effort:"high"/g, 'default_effort:"max"'); raised.push(`${nHigh}× "high"`); }
    let skippedXhigh = 0;
    if (nXhigh > 0) {
      if (cascadeSafe) { out = out.replace(/default_effort:"xhigh"/g, 'default_effort:"max"'); raised.push(`${nXhigh}× "xhigh"`); }
      else skippedXhigh = nXhigh;
    }

    if (raised.length === 0) {
      if (skippedXhigh > 0) {
        return { js, status: "failed", detail: `${skippedXhigh}× \`default_effort:"xhigh"\` NOT raised: P0's resolver cascade is absent, so raising them could regress a non-max model to "high" — refusing (fix P0's anchor first)` };
      }
      return { js, status: "already", detail: `all model default_effort already floored to "max" (none at "high"/"xhigh")` };
    }

    const remHigh = (out.match(/default_effort:"high"/g) || []).length;
    if (remHigh !== 0) return { js, status: "failed", detail: `verify failed: ${remHigh} \`default_effort:"high"\` still present after replace` };
    if (cascadeSafe) {
      const remXhigh = (out.match(/default_effort:"xhigh"/g) || []).length;
      if (remXhigh !== 0) return { js, status: "failed", detail: `verify failed: ${remXhigh} \`default_effort:"xhigh"\` still present after replace` };
    }

    let detail = `floored model default_effort to "max" (${raised.join(", ")}); the capability guard degrades an unsupported "max" (max -> xhigh -> high) so no model drops below stock`;
    if (skippedXhigh > 0) detail += `; SKIPPED ${skippedXhigh}× "xhigh" (P0 cascade absent — fail-safe, no regression)`;
    return { js: out, status: "applied", detail };
  } catch (e) {
    return { js, status: "failed", detail: `P1 threw: ${e.message}` };
  }
}

// P2 — uncap the persisted /effort enum: add "max".
//
// MULTI-MODULE: on v2.1.251 this literal appears twice in its own chunk, both
// keyed `effortLevel:ie([...])` — Bun duplicating ONE schema field verbatim
// across two structurally-similar schemas (settings.json vs settings.local.json
// validation, most likely), not two different settings. "effortLevel" is the
// on-disk persisted-settings key — it crosses the JSON serialization boundary,
// so unlike a local binding it can't be minifier-mangled, which makes it safe
// to anchor on literally. When every occurrence is keyed this way, replace all
// of them; if even one occurrence carries different surrounding context, this
// really could be an unrelated enum that happens to share the same 4 stock
// values, and guessing wrong would silently uncap the wrong setting — refuse.
function p2_uncapEffortEnum(js) {
  try {
    const capped = '["low","medium","high","xhigh"]';
    const uncapped = '["low","medium","high","xhigh","max"]';
    const nCapped = js.split(capped).length - 1;
    if (nCapped === 0) {
      const hasUncapped = js.includes(uncapped);
      return {
        js, status: hasUncapped ? "already" : "failed",
        detail: hasUncapped
          ? `effort enum already includes "max"`
          : `anchor MISSING: capped enum ["low","medium","high","xhigh"] not found — the /effort setting schema likely changed; enum uncap NOT applied`,
      };
    }
    if (nCapped > 1) {
      const KEY_BEFORE = /effortLevel:[$\w]+\($/;
      let idx = -1, allKeyed = true;
      while ((idx = js.indexOf(capped, idx + 1)) !== -1) {
        if (!KEY_BEFORE.test(js.slice(Math.max(0, idx - 40), idx))) { allKeyed = false; break; }
      }
      if (!allKeyed) {
        return { js, status: "failed", detail: `ambiguous: ${nCapped} capped effort enums found (expected 1) — refusing to guess which is the /effort setting; enum uncap NOT applied` };
      }
      const out = js.replaceAll(capped, uncapped);
      if (out.includes(capped)) return { js, status: "failed", detail: `verify failed: capped enum still present after replace` };
      return { js: out, status: "applied", detail: `added "max" to the persisted /effort enum (${nCapped}× duplicate "effortLevel" schema sites in this chunk, all keyed the same, all patched)` };
    }
    const out = js.replace(capped, uncapped);
    if ((out.split(capped).length - 1) !== 0) return { js, status: "failed", detail: `verify failed: capped enum still present after replace` };
    return { js: out, status: "applied", detail: `added "max" to the persisted /effort enum (was capped at xhigh)` };
  } catch (e) {
    return { js, status: "failed", detail: `P2 threw: ${e.message}` };
  }
}

// P3 — /effort validator: accept "max" too. Anchor on the literal comparison
// chain; CAPTURE the (minified) parameter name, don't hardcode it.
function p3_validatorAcceptsMax(js) {
  try {
    // function BODY: if(X==="low"||X==="medium"||X==="high"||X==="xhigh")return X;
    const re = /(([$\w]+)==="low"\|\|\2==="medium"\|\|\2==="high"\|\|\2==="xhigh")\)return/;
    const m = js.match(re);
    if (!m) {
      const hasMax = /==="xhigh"\|\|[$\w]+==="max"\)return/.test(js);
      return {
        js, status: hasMax ? "already" : "failed",
        detail: hasMax
          ? `/effort validator already accepts "max"`
          : `anchor MISSING: the low||medium||high||xhigh validator chain not found — CC's effort validator likely changed; validator patch NOT applied (P2's enum uncap may still suffice)`,
      };
    }
    const v = m[2]; // captured minified parameter name
    const out = js.replace(re, `${m[1]}||${v}==="max")return`);
    if (!new RegExp(`==="xhigh"\\|\\|${v}==="max"\\)return`).test(out)) return { js, status: "failed", detail: `verify failed: validator does not accept "max" after patch` };
    return { js: out, status: "applied", detail: `/effort validator now accepts "max" (captured param "${v}")` };
  } catch (e) {
    return { js, status: "failed", detail: `P3 threw: ${e.message}` };
  }
}

// P4 — lift the PR-summary bullet cap that upstream MOVED OUT of prompt text and
// INTO code. Through v2.1.202 the /quick-pr + git-commit PR body carried a literal
// "<1-3 bullet points>" in prompt text, lifted by three scripts/apply-unnerfs.py
// rules. v2.1.205 refactored the template to `${PR_SUMMARY_CONTENT()}` whose JS
// generator (function S7t) RETURNS "<1-3 bullet points>" — now a code string the
// prompt layer can't reach. This is the same brevity un-nerf, retargeted here (the
// established home for in-code caps); the retired prompt rules point at this patch.
// String-literal contract, byte-unique, count-guarded (like P2), fail-open.
// IDEMPOTENCY: the replacement contains an em dash, and this patch runs on the
// OUTPUT of patch-prompts.mjs, whose generator respells every literal non-ASCII
// char as a \uXXXX escape. A literal em dash written on one run therefore comes
// back as the 6-char sequence \u2014 on the next, and an `includes(unnerf)` check
// written against the literal form misses it — the patch then finds neither the
// stock anchor nor its own output and reports a FALSE "anchor MISSING" failure
// (seen on a re-install over an already-patched binary at v2.1.220). Two guards:
// write the literal through encodeQuoted(), the SAME canonicaliser the AST stage
// uses, so the inserted bytes already are what a regenerated bundle would hold;
// and detect on an ASCII-only prefix that is identical in every spelling.
function p4_liftPrSummaryBulletCap(js) {
  try {
    const stock = '"<1-3 bullet points>"';
    // Written naturally; encodeQuoted() supplies the delimiters and the \uXXXX escaping.
    const unnerf = encodeQuoted("<bullet points covering all notable changes — as many as the work warrants>");
    // ASCII-only, unique, and common to the literal and \u2014-escaped spellings.
    const unnerfMarker = '"<bullet points covering all notable changes ';
    const n = js.split(stock).length - 1;
    if (n === 0) {
      const has = js.includes(unnerfMarker);
      return {
        js, status: has ? "already" : "failed",
        detail: has
          ? `PR-summary bullet cap already lifted`
          : `anchor MISSING: "<1-3 bullet points>" not found — the PR-summary generator likely changed again; cap NOT lifted (PR summaries keep stock brevity)`,
      };
    }
    if (n > 1) return { js, status: "failed", detail: `ambiguous: ${n}× "<1-3 bullet points>" found (expected 1) — refusing to guess; cap NOT lifted` };
    const out = js.replace(stock, unnerf);
    if (out.includes(stock)) return { js, status: "failed", detail: `verify failed: bullet cap still present after replace` };
    return { js: out, status: "applied", detail: `lifted the PR-summary bullet cap (upstream v2.1.205 moved "<1-3 bullet points>" into a JS generator; same text as the retired prompt un-nerf)` };
  } catch (e) {
    return { js, status: "failed", detail: `P4 threw: ${e.message}` };
  }
}

const PATCHES = [
  { name: "cascade-max-fallback", fn: p0_cascadeMaxFallback }, // must precede floor
  { name: "floor-default-effort", fn: p1_floorDefaultEffort },
  { name: "uncap-effort-enum", fn: p2_uncapEffortEnum },
  { name: "validator-accepts-max", fn: p3_validatorAcceptsMax },
  { name: "lift-pr-summary-bullet-cap", fn: p4_liftPrSummaryBulletCap },
];

// Apply all patches best-effort. Returns { js, results, ok }. `ok` is true iff
// every patch ended "applied" or "already" (i.e. nothing is silently missing).
export function applyCodePatches(js, opts = {}) {
  const results = [];
  // ASCII INVARIANT. The bundle is pure ASCII and must stay that way for two
  // independent reasons: Bun refuses to boot a standalone container holding a raw
  // non-ASCII byte, and — subtler, and what actually bit P4 — the AST generator
  // respells any literal non-ASCII as \uXXXX on the NEXT run, so a patch that
  // writes one can no longer recognise its own output and reports a false "anchor
  // MISSING". Inserted text must go through encodeQuoted()/escapeCommon() from
  // normalize-ast.mjs. Checked after every patch so the offender is NAMED rather
  // than merely detected, and only when the input was clean, so a dirty input is
  // reported once as its own fault instead of blamed on the first patch to run.
  const NON_ASCII = /[^\x00-\x7F]/;
  const dirtyInput = NON_ASCII.test(js);
  if (dirtyInput) {
    results.push({
      name: "ascii-invariant",
      status: "failed",
      detail: `INPUT bundle already contains non-ASCII (offset ${js.search(NON_ASCII)}) — not introduced here; the repacked binary will not boot. Re-run the prompt splice, which fails closed on this.`,
    });
  }
  for (const p of PATCHES) {
    const r = p.fn(js, opts);
    js = r.js;
    results.push({ name: p.name, status: r.status, detail: r.detail });
    if (!dirtyInput && NON_ASCII.test(js)) {
      const at = js.search(NON_ASCII);
      results.push({
        name: `${p.name}/ascii-invariant`,
        status: "failed",
        detail: `this patch inserted a non-ASCII character (${JSON.stringify(js[at])} at offset ${at}). Bun will refuse to boot the repacked binary, and the AST generator would respell it \\uXXXX on the next run, making this patch report a false "anchor MISSING". Build the replacement with encodeQuoted()/escapeCommon() from normalize-ast.mjs instead of writing the character literally.`,
      });
      return { js, results, ok: false, posture: posture(js) };
    }
  }
  const ok = results.every((r) => r.status === "applied" || r.status === "already");
  return { js, results, ok, posture: posture(js) };
}

// --- multi-module directory helpers ------------------------------------------
// Full read: every module in the manifest is read straight from jsDir. Correct
// for a pristine `unpackToDir` output where every module is physically present
// (that's the only kind of directory `posture`/`verify` are ever pointed at —
// see upgrade.sh, which snapshots posture on the fresh unpack, before any
// patcher has run and sparsified anything).
function loadModules(jsDir) {
  const manifestPath = join(jsDir, "manifest.json");
  if (!existsSync(manifestPath)) return null;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return manifest.modules.map((entry) => ({ relPath: entry.relPath, source: readFileSync(join(jsDir, entry.relPath), "utf8") }));
}

// Overlay read: like loadModules, but for a directory that sits downstream of
// another sparse-writing patcher (patch-prompts.mjs) rather than a pristine
// unpack. That patcher writes only the handful of modules it actually changed
// plus a carried-forward manifest.json — by design, to skip a babel-generator
// pass and a file write for the ~1700 modules it never touches. So "the current
// state of the bundle" is a per-module choice, not a single directory: read
// from inJsDir if that module was touched, else fall back to origJsDir. This is
// the same replacement-if-present-else-original rule repackFromDir applies at
// the binary layer, just applied one layer up, at the unpacked-module layer.
function loadModulesOverlay(origJsDir, inJsDir) {
  const manifestPath = join(inJsDir, "manifest.json");
  if (!existsSync(manifestPath)) return null;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return manifest.modules.map((entry) => {
    const overlayPath = join(inJsDir, entry.relPath);
    const sourcePath = existsSync(overlayPath) ? overlayPath : join(origJsDir, entry.relPath);
    return { relPath: entry.relPath, source: readFileSync(sourcePath, "utf8"), fromOverlay: sourcePath === overlayPath };
  });
}

// Run P0-P4 across EVERY module and collect whichever ones actually changed.
// Earlier design ran the whole P0-P4 sequence against a single "relevant"
// module (the first with any non-"anchor MISSING" result) on the theory that
// the effort-config code all lives in one place. Empirically false on
// v2.1.251: P0 (cascade) and P3 (validator) share one chunk, P1 (model
// catalog defaults) lives in a SECOND chunk, and P4 (PR-summary cap) in a
// THIRD — Bun's code-splitter groups by import graph, and the resolver,
// settings schema, model catalog, and PR-description generator are simply
// different subsystems with different call graphs. Stopping at the first hit
// silently skipped whichever patches' real homes weren't in that one module.
//
// The only genuine cross-patch dependency is P0 -> P1 (p1's cascadeSafe
// check) — resolved by scanning for the cascade globally FIRST (see
// cascadeAppliedElsewhere below) rather than per-module, since P0's guard and
// P1's default_effort fields don't have to be co-located.
//
// The anchor/best-result check is scoped to the 5 real PATCHES entries by
// name, not to every entry in results: a module with pre-existing non-ASCII
// content unrelated to effort patches at all (a doc string, a genuine unicode
// UI label) pushes an "ascii-invariant" result whose detail never starts with
// "anchor MISSING:" — it must never count toward a patch's own verdict.
const PATCH_NAMES = new Set(PATCHES.map((p) => p.name));
function applyAcrossModules(modules) {
  const cascadeAppliedElsewhere = modules.some(
    (m) => GUARD_CASCADED.test(m.source) || p0_cascadeMaxFallback(m.source).status === "applied"
  );

  const touched = new Map(); // relPath -> patched source
  // Per patch name, keep whichever module produced the BEST outcome seen so
  // far (applied > already > failed) — the headline verdict to report for
  // that patch, independent of which module(s) happened to hold it.
  const RANK = { applied: 3, already: 2, failed: 1 };
  const byPatch = new Map(
    PATCHES.map((p) => [p.name, { status: "failed", relPath: null, detail: `anchor MISSING: not found in any of ${modules.length} modules` }])
  );

  for (const m of modules) {
    const { js: out, results } = applyCodePatches(m.source, { cascadeAppliedElsewhere });
    if (out !== m.source) touched.set(m.relPath, out);
    for (const r of results) {
      if (!PATCH_NAMES.has(r.name)) continue; // exclude ascii-invariant entries
      const cur = byPatch.get(r.name);
      if (RANK[r.status] > RANK[cur.status]) byPatch.set(r.name, { status: r.status, relPath: m.relPath, detail: r.detail });
    }
  }

  const ok = [...byPatch.values()].every((v) => v.status === "applied" || v.status === "already");
  return {
    touched: [...touched.entries()].map(([relPath, source]) => ({ relPath, source })),
    byPatch,
    ok,
    cascadeAppliedElsewhere,
  };
}

// --- CLI --------------------------------------------------------------------
import { pathToFileURL } from "node:url";
// realpath argv[1] before comparing — import.meta.url is symlink-resolved by
// Node's loader, argv[1] isn't (e.g. macOS's /tmp -> /private/tmp), so a raw
// comparison silently skips main() while still exiting 0 when run through one.
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  // a/b/c are reinterpreted per command, same as the old single-file CLI did
  // (posture/verify take one dir; apply takes three — see its usage string).
  const [cmd, a, b, c] = process.argv.slice(2);
  const die = (m, code = 1) => { console.error(`apply-code-patches: ${m}`); process.exit(code); };
  const opt = (n, d) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : d; };
  const requireModules = (dir, label) => {
    if (!dir || !existsSync(dir)) die(`${label} not found: ${dir}`, 2);
    const modules = loadModules(dir);
    if (!modules) die(`manifest.json not found in ${dir} — was this produced by 'bun-binary.mjs unpack'?`, 2);
    return modules;
  };

  if (cmd === "posture") {
    const modules = requireModules(a, "directory");
    console.log(JSON.stringify(mergePosture(modules.map((m) => posture(m.source))), null, 2));
    process.exit(0);
  }
  if (cmd === "verify") {
    const modules = requireModules(a, "directory");
    const p = mergePosture(modules.map((m) => posture(m.source)));
    // All effort un-nerfs present iff: no "high"/"xhigh" defaults remain, the
    // resolver cascade is in place, and both /effort caps are lifted.
    const applied = p.defaultEffort.high === 0 && p.defaultEffort.xhigh === 0 &&
      p.maxFallback === "xhigh" && p.effortEnumCapped === 0 && p.validatorCapped === 0;
    console.log(JSON.stringify(p, null, 2));
    console.error(applied ? "verify: all effort un-nerfs present" : "verify: some effort un-nerfs MISSING");
    process.exit(applied ? 0 : 1);
  }
  if (cmd === "apply") {
    const usage = "usage: apply <origJsDir> <inJsDir> <outJsDir> [--posture-out FILE]";
    if (!a || !existsSync(a)) die(`${usage}  (origJsDir not found)`, 2);
    if (!b || !existsSync(b)) die(`${usage}  (inJsDir not found)`, 2);
    if (!c) die(`${usage}  (outJsDir required)`, 2);
    // origJsDir = the pristine unpack (every module present, for the search
    // across ~1800 modules); inJsDir = patch-prompts.mjs's sparse output
    // (manifest + only the modules IT changed). Overlaying the two gives the
    // bundle's true current state per module, exactly like repackFromDir
    // overlays a sparse dir on top of the original binary at repack time.
    const modules = loadModulesOverlay(a, b);
    if (!modules) die(`manifest.json not found in ${b} — was this produced by 'bun-binary.mjs unpack' or patch-prompts.mjs?`, 2);

    mkdirSync(c, { recursive: true });
    // outJsDir must carry every module patch-prompts.mjs already made, since
    // this is the last stop before repackFromDir and that tool only consults
    // ONE directory — anything not carried forward here is silently lost.
    const manifest = JSON.parse(readFileSync(join(b, "manifest.json"), "utf8"));
    writeFileSync(join(c, "manifest.json"), JSON.stringify(manifest, null, 1));
    let carried = 0;
    for (const m of modules) {
      if (!m.fromOverlay) continue;
      const outPath = join(c, m.relPath);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, m.source);
      carried++;
    }

    const { touched, byPatch, ok, cascadeAppliedElsewhere } = applyAcrossModules(modules);
    for (const p of PATCHES) {
      const r = byPatch.get(p.name);
      console.error(`  [${r.status.toUpperCase()}] ${p.name}${r.relPath ? ` (${r.relPath})` : ""}: ${r.detail}`);
    }
    for (const { relPath, source } of touched) {
      const outPath = join(c, relPath);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, source);
    }

    const pOut = opt("--posture-out", null);
    if (pOut) {
      // Posture of the bundle AFTER this step: touched modules' new text,
      // original (overlay) text everywhere else — same replace-if-present-
      // else-original rule repackFromDir uses at the binary layer.
      const bySource = new Map(touched.map((t) => [t.relPath, t.source]));
      const finalPosture = mergePosture(modules.map((m) => posture(bySource.get(m.relPath) ?? m.source)));
      writeFileSync(pOut, JSON.stringify(finalPosture, null, 2) + "\n");
    }
    console.error(`effort un-nerfs: ${ok ? "all applied/present" : "SOME MISSING (see above) — prompt un-nerfs are unaffected"} (${touched.length} module(s) patched, ${carried} carried forward unchanged, cascade ${cascadeAppliedElsewhere ? "present" : "absent"})`);
    console.log(c);
    // NON-fatal by design: exit 0 even on a miss, so a caller that ignores the
    // exit code still ships the (prompt-patched) bundle. Callers that want to
    // gate on effort can parse the stderr or use `verify`.
    process.exit(0);
  }
  die(`usage: node apply-code-patches.mjs <posture|verify> <jsDir> | apply <origJsDir> <inJsDir> <outJsDir>`, 2);
}

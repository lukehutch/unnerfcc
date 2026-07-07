#!/usr/bin/env node
// apply-code-patches.mjs — unnerfcc's BEST-EFFORT effort/model un-nerfs.
//
// CHARTER: unnerfcc never lets reasoning-effort be silently degraded. Anthropic
// increasingly downgrades effort to save server load (a mid-tier default on the
// flagship model, a persisted-effort cap below the model's ceiling) rather than
// fix scalability. These patches lift those silent caps. They are the ONLY
// effort levers a local binary patch can reach — model downgrades pushed via
// server-side Statsig config (e.g. the auto-mode classifier) are out of reach
// and are documented as such, not silently "handled".
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
// change here. Verified against the real Claude Code v2.1.201 bundle: Fable 5,
// Opus 4.8 and Sonnet 5 all carry `default_effort:"high"` + the `max_effort`
// capability, so P1 floors each to a genuine "max"; Opus 4.7 carries
// `default_effort:"xhigh"` (also max-capable) — see P0/P1 for how that is raised
// safely too.
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
//   node apply-code-patches.mjs apply   <inJs> <outJs> [--posture-out FILE]
//   node apply-code-patches.mjs posture <inJs>
//   node apply-code-patches.mjs verify  <inJs>   # exit 0 iff all patches present

import { readFileSync, writeFileSync, existsSync, realpathSync } from "node:fs";

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
function p1_floorDefaultEffort(js) {
  try {
    if (!/default_effort:"[a-z]+"/.test(js)) {
      return { js, status: "failed", detail: `anchor MISSING: no \`default_effort:"..."\` field found — CC's model catalog likely changed its effort-default shape; effort floor NOT applied` };
    }
    const nHigh = (js.match(/default_effort:"high"/g) || []).length;
    const nXhigh = (js.match(/default_effort:"xhigh"/g) || []).length;
    const cascadeSafe = GUARD_CASCADED.test(js);

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
    if (nCapped > 1) return { js, status: "failed", detail: `ambiguous: ${nCapped} capped effort enums found (expected 1) — refusing to guess which is the /effort setting; enum uncap NOT applied` };
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

const PATCHES = [
  { name: "cascade-max-fallback", fn: p0_cascadeMaxFallback }, // must precede floor
  { name: "floor-default-effort", fn: p1_floorDefaultEffort },
  { name: "uncap-effort-enum", fn: p2_uncapEffortEnum },
  { name: "validator-accepts-max", fn: p3_validatorAcceptsMax },
];

// Apply all patches best-effort. Returns { js, results, ok }. `ok` is true iff
// every patch ended "applied" or "already" (i.e. nothing is silently missing).
export function applyCodePatches(js) {
  const results = [];
  for (const p of PATCHES) {
    const r = p.fn(js);
    js = r.js;
    results.push({ name: p.name, status: r.status, detail: r.detail });
  }
  const ok = results.every((r) => r.status === "applied" || r.status === "already");
  return { js, results, ok, posture: posture(js) };
}

// --- CLI --------------------------------------------------------------------
import { pathToFileURL } from "node:url";
// realpath argv[1] before comparing — import.meta.url is symlink-resolved by
// Node's loader, argv[1] isn't (e.g. macOS's /tmp -> /private/tmp), so a raw
// comparison silently skips main() while still exiting 0 when run through one.
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  const [cmd, a, b] = process.argv.slice(2);
  const die = (m, c = 1) => { console.error(`apply-code-patches: ${m}`); process.exit(c); };
  const opt = (n, d) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : d; };

  if (cmd === "posture") {
    if (!a || !existsSync(a)) die(`file not found: ${a}`, 2);
    console.log(JSON.stringify(posture(readFileSync(a, "utf8")), null, 2));
    process.exit(0);
  }
  if (cmd === "verify") {
    if (!a || !existsSync(a)) die(`file not found: ${a}`, 2);
    const p = posture(readFileSync(a, "utf8"));
    // All effort un-nerfs present iff: no "high"/"xhigh" defaults remain, the
    // resolver cascade is in place, and both /effort caps are lifted.
    const applied = p.defaultEffort.high === 0 && p.defaultEffort.xhigh === 0 &&
      p.maxFallback === "xhigh" && p.effortEnumCapped === 0 && p.validatorCapped === 0;
    console.log(JSON.stringify(p, null, 2));
    console.error(applied ? "verify: all effort un-nerfs present" : "verify: some effort un-nerfs MISSING");
    process.exit(applied ? 0 : 1);
  }
  if (cmd === "apply") {
    if (!a || !existsSync(a)) die(`usage: apply <inJs> <outJs> [--posture-out FILE]  (inJs not found)`, 2);
    if (!b) die(`usage: apply <inJs> <outJs> [--posture-out FILE]  (outJs required)`, 2);
    const { js, results, ok, posture: post } = applyCodePatches(readFileSync(a, "utf8"));
    for (const r of results) console.error(`  [${r.status.toUpperCase()}] ${r.name}: ${r.detail}`);
    writeFileSync(b, js);
    const pOut = opt("--posture-out", null);
    if (pOut) writeFileSync(pOut, JSON.stringify(post, null, 2) + "\n");
    console.error(`effort un-nerfs: ${ok ? "all applied/present" : "SOME MISSING (see above) — prompt un-nerfs are unaffected"}`);
    console.log(b);
    // NON-fatal by design: exit 0 even on a miss, so a caller that ignores the
    // exit code still ships the (prompt-patched) bundle. Callers that want to
    // gate on effort can parse the stderr or use `verify`.
    process.exit(0);
  }
  die(`usage: node apply-code-patches.mjs <apply|posture|verify> ...`, 2);
}

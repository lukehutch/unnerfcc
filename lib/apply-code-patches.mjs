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
// THE PATCHES
//   P1  Floor the model default effort: `default_effort:"high"` -> `"max"`.
//       Only "high" is raised (not "xhigh"), which makes the raise
//       REGRESSION-PROOF: CC's own runtime guard `if(eff==="max"&&!supportsMax)
//       eff="high"` downgrades an unsupported "max" back to "high" — exactly the
//       stock value — so a raised model either rises to max (Opus 4.8 and any
//       future max-capable model) or stays high. It never drops below stock.
//       Also defeats the "launch-effort pin" nerf (a fresh Opus/Fable session
//       resolves to the model default, ignoring the user's persisted effort):
//       the default it resolves to is now max, no resolver-code patch needed.
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

import { readFileSync, writeFileSync, existsSync } from "node:fs";

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
    // the runtime capability guard we rely on for P1 safety (max -> high)
    capGuardPresent: count(/\?"max":"high"/g) > 0 || /==="max"&&![$\w]+\([$\w]+\)\)?[^;]{0,8}="high"/.test(js),
  };
}

// --- the patches ------------------------------------------------------------
// Each: apply(js) -> { js, status: "applied"|"already"|"failed", detail }.
// A patch must NEVER throw out of here; it catches its own errors and reports.

// P1 — floor default_effort "high" -> "max" (regression-proof; see header).
function p1_floorDefaultEffort(js) {
  try {
    const before = (js.match(/default_effort:"high"/g) || []).length;
    if (before === 0) {
      // Either already applied, or the field/vocabulary changed.
      const anyField = /default_effort:"[a-z]+"/.test(js);
      return {
        js, status: anyField ? "already" : "failed",
        detail: anyField
          ? `no \`default_effort:"high"\` to raise (already floored, or all defaults already >= high)`
          : `anchor MISSING: no \`default_effort:"..."\` field found — CC's model catalog likely changed its effort-default shape; effort floor NOT applied`,
      };
    }
    const out = js.replace(/default_effort:"high"/g, 'default_effort:"max"');
    // verify: no "high" defaults remain; "max" defaults increased by `before`.
    const remain = (out.match(/default_effort:"high"/g) || []).length;
    if (remain !== 0) return { js, status: "failed", detail: `verify failed: ${remain} \`default_effort:"high"\` still present after replace` };
    return { js: out, status: "applied", detail: `raised ${before} model default_effort "high" -> "max" (guard downgrades any unsupported model back to "high" — never below stock)` };
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
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
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
    const applied = p.defaultEffort.high === 0 && p.effortEnumCapped === 0 && p.validatorCapped === 0;
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

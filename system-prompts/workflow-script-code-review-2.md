<!--
name: 'Workflow Script: /code-review'
description: >-
  Bundled /code-review workflow — scopes the diff, fans out per-angle finders,
  dedups, verifies, sweeps for gaps (xhigh/max), and synthesizes;
  effort-parameterized via LEVEL_PARAMS
ccVersion: 2.1.219
-->
,
}

// code-review: Scope → Find (barrier) → group-by-location → Verify → Sweep (xhigh/max) → Synthesize
// Effort parameterization mirrors the inline /code-review cells. Correctness
// keeps one finder per angle; cleanup is one finder covering all cleanup
// angles, capped at (cleanup-angle count × perAngle) so the merged finder
// has the same total cleanup-candidate budget the old per-angle finders had.
//   high  → 3 correctness + 1 cleanup (5 angles) → all verified findings
//   xhigh → 5 correctness + 1 cleanup (5 angles) → sweep → all verified findings
//   max   → same structure as xhigh (the API reasoning effort differs, not the fan-out)
const LEVEL_PARAMS = {
  high: { correctnessAngles: 3, perAngle: 6, maxFindings: 10, sweep: false },
  xhigh: { correctnessAngles: 5, perAngle: 8, maxFindings: 15, sweep: true },
  max: { correctnessAngles: 5, perAngle: 8, maxFindings: 15, sweep: true },
}
const SWEEP_MAX = 8

const RAW_ARGS = (typeof args === "string" ? args : "").trim()
const FIRST = RAW_ARGS.split(/\s+/)[0] || ""
// Own-property check so Object.prototype keys ("constructor", "toString") never parse as a level.
const FIRST_IS_LEVEL = Object.prototype.hasOwnProperty.call(LEVEL_PARAMS, FIRST)
const LEVEL = FIRST_IS_LEVEL ? FIRST : "high"
const TARGET = FIRST_IS_LEVEL ? RAW_ARGS.slice(FIRST.length).trim() : RAW_ARGS
const P = LEVEL_PARAMS[LEVEL]

// Prompt fragments shared with the inline /code-review cells (one source of truth).
const CORRECTNESS_ANGLES = 

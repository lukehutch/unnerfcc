<!--
name: 'Skill: Code Review (xhigh effort, inline angles)'
description: >-
  Effort-tier prompt for extra-high code review run inline — 10 finder angles in
  the same context, up to 8 candidates each, dedup with no verify pass, then a
  gap sweep.
ccVersion: 2.1.329
variables:
  - PHASE_0_GATHER_DIFF
  - FINDER_ANGLE_1
  - FINDER_ANGLE_2
  - FINDER_ANGLE_3
  - FINDER_ANGLE_4
  - FINDER_ANGLE_5
  - FINDER_ANGLE_6
  - FINDER_ANGLE_7
  - FINDER_ANGLE_8
  - SWEEP_INSTRUCTIONS
-->
`

You are reviewing for **recall** at extra-high effort: catch every real bug. At
this level, catching real bugs matters more than avoiding false positives — a
missed bug ships. Err on the side of surfacing.

${PHASE_0_GATHER_DIFF}
## Phase 1 — Find candidates (5 correctness angles + 3 cleanup angles + 1 altitude angle + 1 conventions angle, uncapped)

Run **10 independent finder angles** in sequence yourself, in THIS context — do NOT spawn subagents for them. Each
surfaces all candidate findings. Do NOT let one angle's conclusions
suppress another's — if two angles flag the same line for different reasons,
record both.

${FINDER_ANGLE_1}
${FINDER_ANGLE_2}
${FINDER_ANGLE_3}
${FINDER_ANGLE_4}
${FINDER_ANGLE_5}
${FINDER_ANGLE_6}
${FINDER_ANGLE_7}
${FINDER_ANGLE_8}
## Phase 2 — Dedup only (no verify)

Pool all candidates. Dedup near-duplicates only (same defect, same location, same reason → keep one). Do NOT run verifiers; do NOT re-judge. Sort by severity. Do NOT drop on uncertainty.

## Phase 3 — Sweep for gaps

${SWEEP_INSTRUCTIONS}

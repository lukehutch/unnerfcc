<!--
name: 'Skill: Code Review (inline, no subagents)'
description: >-
  Effort-tier prompt that runs all eight finder angles inline in the current
  context with a dedup-only second phase.
ccVersion: 2.1.219
variables:
  - EFFORT_SUMMARY_LINE
  - REVIEW_STANCE
  - REVIEW_SCOPE_PREAMBLE
  - CORRECTNESS_ANGLE_ONE
  - CORRECTNESS_ANGLE_TWO
  - CORRECTNESS_ANGLE_THREE
  - CLEANUP_ANGLES
  - ALTITUDE_ANGLE
  - CONVENTIONS_ANGLE
  - CANDIDATE_PASSTHROUGH_NOTE
-->
`${EFFORT_SUMMARY_LINE}`

${REVIEW_STANCE}

${REVIEW_SCOPE_PREAMBLE}
## Phase 1 — Find candidates (3 correctness angles + 3 cleanup angles + 1 altitude angle + 1 conventions angle, up to 6 each)

Run **8 independent finder angles** in sequence yourself, in THIS context — do NOT spawn subagents for them. Each
surfaces **up to 6 candidate findings** with `file`, `line`, a one-line
`summary`, and a concrete `failure_scenario`.

${CORRECTNESS_ANGLE_ONE}
${CORRECTNESS_ANGLE_TWO}
${CORRECTNESS_ANGLE_THREE}
${CLEANUP_ANGLES}
${ALTITUDE_ANGLE}
${CONVENTIONS_ANGLE}
${CANDIDATE_PASSTHROUGH_NOTE}
Pass every candidate with a nameable failure scenario through — finders that
silently drop half-believed candidates are the dominant cause of misses.

## Phase 2 — Dedup only (no verify)

Pool all candidates. Dedup near-duplicates only (same defect, same location, same reason → keep one). Do NOT run verifiers; do NOT re-judge. Sort by severity.


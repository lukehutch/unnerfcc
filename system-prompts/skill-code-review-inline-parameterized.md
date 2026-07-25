<!--
name: 'Skill: Code Review (inline, parameterized angles)'
description: >-
  Inline code-review prompt whose angle count and stance are interpolated, with
  a dedup and self-check phase and no subagent verify.
ccVersion: 2.1.219
variables:
  - EFFORT_SUMMARY_LINE
  - REVIEW_STANCE
  - REVIEW_SCOPE_PREAMBLE
  - EXTRA_PREAMBLE
  - ANGLE_COUNT
  - ANGLE_LIST
  - SELF_CHECK_NOTE
  - OUTPUT_SECTION
-->
`${EFFORT_SUMMARY_LINE}`

${REVIEW_STANCE}

${REVIEW_SCOPE_PREAMBLE}
${EXTRA_PREAMBLE}## Phase 1 — Find candidates (${ANGLE_COUNT} angles, single pass)

Work through **${ANGLE_COUNT} angles** yourself, in sequence, in this same
context — do not spawn subagents. Each surfaces candidate findings with
`file`, `line`, a one-line `summary`, and a concrete `failure_scenario`.

${ANGLE_LIST}
${SELF_CHECK_NOTE}
## Phase 2 — Dedup and self-check (no subagent verify)

Dedup near-duplicates (same defect, same location, same reason → keep one).
Re-check each remaining candidate yourself against the diff before keeping it.
${OUTPUT_SECTION}

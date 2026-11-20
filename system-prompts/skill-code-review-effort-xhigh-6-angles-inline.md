<!--
name: 'Skill: Code Review (xhigh effort, 6 inline angles)'
description: >-
  Model-facing prompt for xhigh recall-biased code review running 5 correctness
  angles and 1 conventions angle inline without subagents.
ccVersion: 2.1.329
variables:
  - PHASE_0_GATHER_DIFF
  - FINDER_ANGLE_BLOCK_1
  - FINDER_ANGLE_BLOCK_2
  - FINDER_ANGLE_BLOCK_3
-->
`

You are reviewing for **recall** at extra-high effort: catch every real bug. At
this level, catching real bugs matters more than avoiding false positives — a
missed bug ships. Err on the side of surfacing.

${PHASE_0_GATHER_DIFF}
## Phase 1 — Find candidates (5 correctness angles + 1 conventions angle, uncapped)

Run **6 independent finder angles** in sequence yourself, in THIS context — do NOT spawn subagents for them. Each
surfaces all candidate findings. Do NOT let one angle's conclusions
suppress another's — if two angles flag the same line for different reasons,
record both.

${FINDER_ANGLE_BLOCK_1}
${FINDER_ANGLE_BLOCK_2}
${FINDER_ANGLE_BLOCK_3}

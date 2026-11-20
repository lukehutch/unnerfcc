<!--
name: 'Skill: Code Review (high effort, inline angles)'
description: >-
  Model-facing prompt for high-effort recall-biased code review running 4
  independent finder angles inline without subagents.
ccVersion: 2.1.329
variables:
  - PHASE_0_GATHER_DIFF
  - ANGLE_DEFINITIONS
  - DEDUP_AND_OUTPUT_INSTRUCTIONS
-->
`

You are reviewing for **recall** at high effort: catch every real bug a careful
reviewer would catch in one sitting. At this level, catching real bugs matters
more than avoiding false positives. Err on the side of surfacing.

${PHASE_0_GATHER_DIFF}
## Phase 1 — Find candidates (3 correctness angles + 1 conventions angle, uncapped)

Run **4 independent finder angles**, either in sequence in this context or via parallel subagents where independent coverage helps. Each
surfaces all candidate findings with `file`, `line`, a clear
`summary`, and a concrete `failure_scenario`.

${ANGLE_DEFINITIONS}
${DEDUP_AND_OUTPUT_INSTRUCTIONS}

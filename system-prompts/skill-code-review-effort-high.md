<!--
name: 'Skill: Code Review (high effort)'
description: >-
  Effort-tier prompt for high code review — 3 angles, uncapped candidate reporting,
  recall-biased, all qualifying findings
ccVersion: 2.1.178
variables:
  - PHASE_0_GATHER_DIFF
  - AGENT_TOOL_NAME
  - ANGLES_LINE_BY_LINE
  - ANGLE_REUSE
  - ANGLE_SIMPLIFICATION
  - ANGLE_EFFICIENCY
  - ANGLE_ALTITUDE
  - ANGLE_CONVENTIONS
  - CLEANUP_CANDIDATES_NOTE
  - PHASE_2_VERIFY_RECALL_BIASED
  - OUTPUT_FORMAT_FN
-->
\`high effort → 3+5 angles → 1-vote verify (recall-biased) → all qualifying findings\`

You are reviewing for **recall** at high effort: catch every real bug a careful
reviewer would catch in one sitting. At this level, catching real bugs matters
more than avoiding false positives. Err on the side of surfacing.

${PHASE_0_GATHER_DIFF}
## Phase 1 — Find candidates (3 correctness angles + 3 cleanup angles + 1 altitude angle + 1 conventions angle)

Run **8 independent finder angles** via the ${AGENT_TOOL_NAME} tool. Each
surfaces every candidate finding with \`file\`, \`line\`, a one-line
\`summary\`, and a concrete \`failure_scenario\`.

${ANGLES_LINE_BY_LINE}
${ANGLE_REUSE}
${ANGLE_SIMPLIFICATION}
${ANGLE_EFFICIENCY}
${ANGLE_ALTITUDE}
${ANGLE_CONVENTIONS}
${CLEANUP_CANDIDATES_NOTE}
Pass every candidate with a nameable failure scenario through — finders that
silently drop half-believed candidates bypass the verify step and are the
dominant cause of misses.

${PHASE_2_VERIFY_RECALL_BIASED}
${OUTPUT_FORMAT_FN(10)}

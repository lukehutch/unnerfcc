<!--
name: 'Skill: Code Review (medium effort)'
description: >-
  Effort-tier prompt for medium code review — 8 finder angles, uncapped candidate
  reporting, precision-biased, all qualifying findings
ccVersion: 2.1.218
variables:
  - PHASE_0_GATHER_DIFF
  - AGENT_TOOL_NAME
  - PHASE_1_FINDER_NOTE
  - ANGLES_LINE_BY_LINE
  - CLEANUP_ANGLES
  - PHASE_2_VERIFY_3_STATE
  - OUTPUT_FORMAT_FN
-->
\`medium effort → 3+5 angles → 1-vote verify → all qualifying findings\`

You are reviewing for **precision** at medium effort: every finding you surface
should be one a maintainer would act on.

${PHASE_0_GATHER_DIFF}
## Phase 1 — Find candidates (3 correctness angles + 3 cleanup angles + 1 altitude angle + 1 conventions angle)

Run **8 independent finder angles** via the ${AGENT_TOOL_NAME} tool. Each
surfaces every candidate finding with \`file\`, \`line\`, a one-line
\`summary\`, and a concrete \`failure_scenario\`. ${PHASE_1_FINDER_NOTE}

${ANGLES_LINE_BY_LINE}
${CLEANUP_ANGLES}
Pass every candidate with a nameable failure scenario through — finders that
silently drop half-believed candidates bypass the verify step and are the
dominant cause of misses.

${PHASE_2_VERIFY_3_STATE}
${OUTPUT_FORMAT_FN(8)}

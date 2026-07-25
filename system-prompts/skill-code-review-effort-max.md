<!--
name: 'Skill: Code Review (max / xhigh effort)'
description: >-
  Effort-tier prompt for max and xhigh code review — 10 finder angles, uncapped
  candidate reporting, recall-biased, all qualifying findings
ccVersion: 2.1.219
variables:
  - REVIEW_SCOPE_PREAMBLE
  - AGENT_TOOL_NAME
  - TEST_FILE_SCOPE_NOTE
  - CORRECTNESS_ANGLES
  - CLEANUP_ANGLES
  - ALTITUDE_AND_CONVENTIONS_ANGLES
  - VERIFY_PHASE
-->
 effort: catch every real bug. At
this level, catching real bugs matters more than avoiding false positives — a
missed bug ships. Err on the side of surfacing.

${REVIEW_SCOPE_PREAMBLE}
## Phase 1 — Find candidates (5 correctness angles + 3 cleanup angles + 1 altitude angle + 1 conventions angle)

Run **10 independent finder angles** via the ${AGENT_TOOL_NAME} tool. Each
surfaces every candidate finding. Do NOT let one angle's conclusions
suppress another's — if two angles flag the same line for different reasons,
record both. ${TEST_FILE_SCOPE_NOTE}

${CORRECTNESS_ANGLES}
${CLEANUP_ANGLES}
${ALTITUDE_AND_CONVENTIONS_ANGLES}
This is recall mode — a single non-REFUTED vote carries the finding. Do NOT
drop on uncertainty.

${VERIFY_PHASE}

<!--
name: 'Skill: Code Review (xhigh effort, no ReportFindings tool)'
description: >-
  Effort-tier header for an extra-high-effort review when the reporting tool is
  unavailable — a single inline pass capped at 15 findings.
ccVersion: 2.1.219
variables:
  - EFFORT_LEVEL
  - REPORT_FINDINGS_TOOL_NAME
-->
${EFFORT_LEVEL} effort → ${REPORT_FINDINGS_TOOL_NAME} tool unavailable → single-pass inline → ≤15 findings

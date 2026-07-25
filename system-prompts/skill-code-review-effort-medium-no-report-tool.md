<!--
name: 'Skill: Code Review (medium effort, no ReportFindings tool)'
description: >-
  Effort-tier header for a medium-effort review when the reporting tool is
  unavailable — a single inline pass capped at 8 findings.
ccVersion: 2.1.219
variables:
  - REPORT_FINDINGS_TOOL_NAME
-->
medium effort → ${REPORT_FINDINGS_TOOL_NAME} tool unavailable → single-pass inline → ≤8 findings

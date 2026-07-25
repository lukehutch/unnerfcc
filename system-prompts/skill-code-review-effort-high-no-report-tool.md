<!--
name: 'Skill: Code Review (high effort, no ReportFindings tool)'
description: >-
  Effort-tier header for a high-effort review when the reporting tool is
  unavailable — a single inline pass capped at 10 findings.
ccVersion: 2.1.219
variables:
  - REPORT_FINDINGS_TOOL_NAME
-->
high effort → ${REPORT_FINDINGS_TOOL_NAME} tool unavailable → single-pass inline → ≤10 findings

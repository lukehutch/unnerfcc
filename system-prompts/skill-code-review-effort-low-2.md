<!--
name: 'Skill: Code Review (low effort)'
description: >-
  Effort-tier prompt for low code review — single diff pass, no verify, all
  qualifying findings reported in one ReportFindings call
ccVersion: 2.1.219
variables:
  - REPORT_FINDINGS_TOOL_NAME
-->
Report every qualifying finding, most-severe first, in one
${REPORT_FINDINGS_TOOL_NAME} call with `{level, findings}` — each entry has
`file`, `line`, `summary`, `short_summary` (≤60 characters), and
`failure_scenario`. If nothing qualifies, call it with an empty findings
array. Do not also print the findings as text.

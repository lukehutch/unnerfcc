<!--
name: 'Code Review: ReportFindings Output Instructions'
description: >-
  Tells the code review pass to report at most 8 findings through a single
  ReportFindings call with the required entry fields, never as text.
ccVersion: 2.1.219
variables:
  - REPORT_FINDINGS_TOOL_NAME
-->
Report at most **8 findings**, most-severe first, in one
${REPORT_FINDINGS_TOOL_NAME} call with `{level, findings}` — each entry has
`file`, `line`, `summary`, `short_summary` (≤60 characters), and
`failure_scenario`.
Target at least min(files_changed, 4) findings — if you see fewer, widen to other hunks in the same diff before stopping. If fewer than 4 genuine findings exist, report what you have. Do not also print the findings as text.

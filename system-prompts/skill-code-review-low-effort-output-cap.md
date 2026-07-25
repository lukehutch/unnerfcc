<!--
name: 'Skill: Code Review (low-effort output cap)'
description: >-
  Caps a low-effort review at four one-line findings, requires the literal
  `(none)` when nothing qualifies, and forbids calling the findings-reporting
  tool.
ccVersion: 2.1.219
variables:
  - REPORT_FINDINGS_TOOL_NAME
-->
Output every qualifying finding, most-severe first, one line each (if you found more than a handful, lead with the most serious and note how many more remain rather than silently dropping them):
`path/to/file.ext:123 — what's wrong and the concrete failure`. If nothing
qualifies, output exactly `(none)`. Do not call the
${REPORT_FINDINGS_TOOL_NAME} tool even if it is available.

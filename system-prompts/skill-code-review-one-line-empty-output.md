<!--
name: 'Skill: Code Review one-line empty output rule'
description: >-
  Model-facing instruction to output (none) and never call the findings tool
  when nothing qualifies.
ccVersion: 2.1.329
variables:
  - REPORT_FINDINGS_TOOL_NAME
-->
 If nothing
qualifies, output exactly `(none)`. Do not call the
${REPORT_FINDINGS_TOOL_NAME} tool even if it is available.

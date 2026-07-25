<!--
name: 'Skill: Code Review (fix outcome reporting)'
description: >-
  Tells the model to re-call the findings tool after applying fixes with an
  `outcome` per finding and not to repeat the findings as text.
ccVersion: 2.1.219
variables:
  - REPORT_FINDINGS_TOOL_NAME
-->
call ${REPORT_FINDINGS_TOOL_NAME} again with the same findings, each
carrying an `outcome`: `fixed`, `no_change_needed` (the finding was wrong or
already handled), or `skipped` (real but not applied). Do not repeat the
findings as text

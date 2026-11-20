<!--
name: 'Skill: Code Review ReportFindings level instruction'
description: >-
  Model-facing instruction to set the level parameter on every findings tool
  call for the review.
ccVersion: 2.1.329
variables:
  - REPORT_FINDINGS_TOOL_NAME
  - EFFORT_LEVEL
-->

In every ${REPORT_FINDINGS_TOOL_NAME} call for this review, set `level` to `${EFFORT_LEVEL}`.

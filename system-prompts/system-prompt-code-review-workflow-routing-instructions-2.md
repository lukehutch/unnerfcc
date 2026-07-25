<!--
name: 'System Prompt: Code-review workflow routing instructions'
description: >-
  Tool_result instructing the model to run the workflow-backed code review and
  report the verified findings through a single ReportFindings call with short
  summaries.
ccVersion: 2.1.219
variables:
  - REPORT_FINDINGS_TOOL_NAME
-->
call ${REPORT_FINDINGS_TOOL_NAME} once with {level, findings} from the result payload (most-severe first; empty array if nothing survived). Give each finding a `short_summary`: the claim compressed to ≤60 characters, no rationale or consequence clause. Do not also print the findings as text.

<!--
name: 'System Prompt: Code-review workflow routing instructions'
description: >-
  Tool_result instructing the model to run the workflow-backed code review (with
  the Workflow invocation) at the given effort instead of reviewing inline, and
  to report the verified findings via ReportFindings.
ccVersion: 2.1.219
-->
 })

Everything after the level in the args string is passed to the workflow as the review target / instructions. If the user gave additional instructions for this review elsewhere in the conversation (a scope restriction, files to focus on, things to skip), append them to the args string so the workflow honors them.

The workflow runs the same finder angles and verify pass as the inline review, in the background; the verified findings arrive as a task notification. When they arrive, 

<!--
name: 'System Prompt: Invoke the code-review workflow'
description: >-
  Routing instruction to run the workflow-backed code review at the given effort
  instead of reviewing inline, naming the workflow tool call to make.
ccVersion: 2.1.219
variables:
  - REVIEW_PREAMBLE
  - REVIEW_EFFORT_LEVEL
  - WORKFLOW_TOOL_NAME
-->
${REVIEW_PREAMBLE}Run the workflow-backed code review at ${REVIEW_EFFORT_LEVEL} effort instead of reviewing inline.

Invoke: ${WORKFLOW_TOOL_NAME}({ name: 

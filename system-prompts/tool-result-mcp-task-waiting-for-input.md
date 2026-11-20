<!--
name: 'Tool Result: MCP task waiting for input'
description: >-
  Model-facing tool result stating that the task is waiting for input so the
  polling service did not take it and this session polls and cancels it if
  unable to answer.
ccVersion: 2.1.329
variables:
  - TASK_ID
-->
Task ${TASK_ID} is waiting for input, so the polling service did not take it. This session polls it, and cancels it if it cannot give the input. A task notification tells the outcome.

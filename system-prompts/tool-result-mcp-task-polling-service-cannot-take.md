<!--
name: 'Tool Result: Polling service cannot take MCP task'
description: >-
  Model-facing tool result explaining that the polling service cannot take the
  specified task in this session and nothing changed.
ccVersion: 2.1.329
variables:
  - TASK_ID
-->
The polling service cannot take task ${TASK_ID} in this session, so nothing changed: if this session polls the task, it polls on, and if tracking had stopped, nobody polls it. A second call now gives the same result.

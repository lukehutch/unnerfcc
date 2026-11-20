<!--
name: 'Tool Result: Session polling MCP task fallback'
description: >-
  Model-facing tool result stating that the polling service cannot take the task
  right now so the session will poll it while running.
ccVersion: 2.1.329
variables:
  - TASK_ID
-->
The polling service cannot take task ${TASK_ID} right now. This session polls the task while it runs. If the session stops first, nobody polls the task until the user writes again.

<!--
name: 'Tool Result: Server-side MCP task cancelled'
description: >-
  Informs the model that a started server-side task was stopped early, a cancel
  was sent, and no result will follow.
ccVersion: 2.1.325
variables:
  - SERVER_TASK_ID
  - LOCAL_TASK_ID
-->
" started server-side task ${SERVER_TASK_ID}, listed as task ${LOCAL_TASK_ID}. It was stopped before it ended; a cancel was sent to the server, and no result will follow.

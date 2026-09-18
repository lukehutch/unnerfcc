<!--
name: 'Tool Result: MCP tool moved to background'
description: >-
  Tells the model an MCP tool was moved to the background as a task so an
  incoming message can reach it, while continuing to run.
ccVersion: 2.1.277
variables:
  - MCP_TOOL_NAME
  - TASK_ID
-->
MCP tool "${MCP_TOOL_NAME}" was moved to the background as task ${TASK_ID} so that a message that arrived while it was running can reach you; it was not interrupted and keeps running

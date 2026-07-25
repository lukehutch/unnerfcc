<!--
name: 'Tool Result: MCP tool moved to background'
description: >-
  Tells the model a slow MCP tool kept running as a background task, that a
  notification will bring the result, and how to stop it.
ccVersion: 2.1.219
variables:
  - MCP_TOOL_NAME
  - TIMEOUT_SECONDS
  - TASK_ID
-->
MCP tool "${MCP_TOOL_NAME}" is still running after ${TIMEOUT_SECONDS}s. It was moved to the background as task ${TASK_ID} and keeps running; you'll receive a notification with the result when it completes. You can keep working in the meantime. To stop it, use TaskStop with task_id "${TASK_ID}". Note: it does not survive exiting this session.

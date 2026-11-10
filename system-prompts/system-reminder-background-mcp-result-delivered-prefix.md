<!--
name: 'System Reminder: Background MCP result delivered prefix'
description: >-
  Prefix noting that a tool result was delivered by Claude Code because a
  background task finished.
ccVersion: 2.1.321
variables:
  - RESULT_PREFIX
  - TOOL_NAME
  - TASK_TYPE
-->
${RESULT_PREFIX} This ${TOOL_NAME} result was delivered by Claude Code because a background ${TASK_TYPE} finished.

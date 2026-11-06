<!--
name: 'System Reminder: Container restarted wait for notifications'
description: >-
  Instructs waiting for resumed agents' notifications before repeating work and
  how to fallback resume.
ccVersion: 2.1.318
variables:
  - AGENT_TOOL_NAME
-->
. Wait for their notifications, which name each agent's task and give its result, before you do that work again. If one does not report back, send a message to its agent id with the ${AGENT_TOOL_NAME} tool to resume it.

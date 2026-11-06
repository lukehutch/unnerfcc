<!--
name: 'System Reminder: Stopped agent fallback resume instruction'
description: >-
  Instructs sending a message via the agent tool to resume an agent if it does
  not report back.
ccVersion: 2.1.318
variables:
  - AGENT_TOOL_NAME
-->
 If one does not report back, send a message to its agent id with the ${AGENT_TOOL_NAME} tool to resume it.

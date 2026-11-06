<!--
name: 'System Reminder: Container restarted agent result notification'
description: >-
  Instructs not re-launching resumed agents and handling missing reports via the
  agent tool.
ccVersion: 2.1.318
variables:
  - AGENT_TOOL_NAME
-->

You need not launch any of them again. You get each agent's result in a notification when it is done. If one does not report back, send a message to its agent id with the ${AGENT_TOOL_NAME} tool to resume it.

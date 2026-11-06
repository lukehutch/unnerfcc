<!--
name: 'System Reminder: Tool not available to subagent'
description: >-
  Informs a subagent that a requested tool is not available and directs it to
  complete the task with provided tools.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
. ${TOOL_NAME} is not available to this agent. Complete the task with the tools provided and return findings to the orchestrator.

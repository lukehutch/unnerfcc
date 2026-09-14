<!--
name: 'System Reminder: Agent report delivered notification'
description: >-
  Notifies that an agent report was delivered via a message from the specified
  tool call.
ccVersion: 2.1.270
variables:
  - AGENT_NAME
  - REPORT_TOOL_NAME
-->
This agent's report was delivered to you as a message from "${AGENT_NAME}" (its ${REPORT_TOOL_NAME} call). Read it there; it is not repeated here.

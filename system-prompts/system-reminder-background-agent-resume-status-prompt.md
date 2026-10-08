<!--
name: 'System Reminder: Resume background agent status prompt'
description: >-
  Instructs resuming the agent via SendMessage and ask for a status report
  before assuming the task landed.
ccVersion: 2.1.293
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
Resume it by sending it a message with ${SEND_MESSAGE_TOOL_NAME} and ask for a status report before assuming the task landed.

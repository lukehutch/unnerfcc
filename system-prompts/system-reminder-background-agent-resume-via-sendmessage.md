<!--
name: 'System Reminder: Resume background agent via SendMessage'
description: >-
  Advises sending a message via SendMessage to resume an incomplete agent and
  ask for status.
ccVersion: 2.1.293
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
Send it another message with ${SEND_MESSAGE_TOOL_NAME} to resume it and ask for a status report before assuming the task landed.

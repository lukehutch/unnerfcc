<!--
name: 'Task Notification: Resume the fetch agent for its report'
description: >-
  Tail telling the model to send the agent another message with SendMessage to
  resume it and get its report before assuming the fetch landed.
ccVersion: 2.1.293
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
Send it another message with ${SEND_MESSAGE_TOOL_NAME} to resume it and get its report before assuming the fetch landed.

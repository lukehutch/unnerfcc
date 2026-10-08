<!--
name: 'Task Notification: Resume the agent for its report'
description: >-
  Tail telling the model to resume the agent by sending it a message with
  SendMessage to get its report.
ccVersion: 2.1.293
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
Resume it by sending it a message with ${SEND_MESSAGE_TOOL_NAME} to get its report.

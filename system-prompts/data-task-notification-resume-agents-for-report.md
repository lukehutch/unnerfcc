<!--
name: 'Task Notification: Resume any of the agents for its report'
description: >-
  Tail telling the model to resume any of the listed agents by sending a message
  to its id with SendMessage to get its report.
ccVersion: 2.1.293
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
Resume any of them by sending a message to its id with ${SEND_MESSAGE_TOOL_NAME} to get its report.

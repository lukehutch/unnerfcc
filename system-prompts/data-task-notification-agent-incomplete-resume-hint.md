<!--
name: 'Task Notification: Incomplete agent may be resumable'
description: >-
  Tells the model that a background agent which could not be automatically
  restarted may still be resumable by sending it a message with SendMessage.
ccVersion: 2.1.293
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
It could not be automatically restarted. Its transcript may still be resumable by sending it a message with ${SEND_MESSAGE_TOOL_NAME}

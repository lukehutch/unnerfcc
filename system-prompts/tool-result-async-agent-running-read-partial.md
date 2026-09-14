<!--
name: 'Tool Result: Async Agent Running (message for progress)'
description: >-
  Tool result note when a spawned async agent is still running: do not spawn a
  duplicate, send a message if progress report is needed.
ccVersion: 2.1.270
variables:
  - MESSAGE_TOOL_NAME
-->
Do NOT spawn a duplicate. You will be notified when it completes. Send it a message with ${MESSAGE_TOOL_NAME} if you need a progress report before then.

<!--
name: 'System Reminder: Project thread turn missing terminal reply'
description: >-
  Reminds the model that plain text does not reach the project thread and
  directs calling the thread reply tool.
ccVersion: 2.1.273
variables:
  - REMINDER_PREFIX
  - SERVER_NAME
  - REPLY_TOOL
  - DEFER_TOOL
  - DISMISS_TOOL
-->
${REMINDER_PREFIX} Your last turn ended without a terminal `mcp__${SERVER_NAME}__*` tool call, so nothing reached the project thread: plain text is not delivered there. Call `${REPLY_TOOL}` now with what the thread should see, `${DEFER_TOOL}` if you dispatched work that reports back later, or `${DISMISS_TOOL}` if no reply is warranted.

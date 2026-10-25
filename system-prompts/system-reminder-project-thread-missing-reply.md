<!--
name: 'System Reminder: Project thread turn missing terminal reply'
description: >-
  Reminds the model that plain text does not reach the project thread and
  directs calling the thread reply tool.
ccVersion: 2.1.310
variables:
  - SERVER_NAME
-->
Your last turn ended without a terminal `mcp__${SERVER_NAME}__*` tool call, so nothing reached the project thread: plain text is not delivered there. Call `

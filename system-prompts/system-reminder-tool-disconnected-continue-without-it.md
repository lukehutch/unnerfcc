<!--
name: 'System Reminder: Tool disconnected continue without it'
description: >-
  Informs the model that a tool provider has disconnected and to proceed without
  the tool.
ccVersion: 2.1.257
variables:
  - TOOL_NAME
-->
. ${TOOL_NAME} is still listed for this conversation, but whatever provides it has disconnected, so it cannot run right now. Continue without it; it will work again if it reconnects.

<!--
name: 'System Reminder: Tool disconnected continue without it'
description: >-
  Informs the model that a tool provider has disconnected and to proceed without
  the tool.
ccVersion: 2.1.263
variables:
  - TOOL_NAME
-->
. ${TOOL_NAME} is still listed for this conversation, but nothing in this session provides it right now (what provided it disconnected, or this version no longer has it), so it cannot run. Continue without it.

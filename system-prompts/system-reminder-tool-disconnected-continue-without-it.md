<!--
name: 'System Reminder: Tool disconnected continue without it'
description: >-
  Informs the model that a tool provider has disconnected and to proceed without
  the tool.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
  - STATUS_CLAUSE
  - EXTRA_NOTE
-->
. ${TOOL_NAME} ${STATUS_CLAUSE}, but nothing in this session provides it right now (its source was removed or disconnected, or this version no longer has it), so it cannot run. Continue without it.${EXTRA_NOTE}

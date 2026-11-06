<!--
name: 'Tool Result: Tool disabled in current session'
description: >-
  Informs the model that a listed tool is currently switched off in this session
  and to proceed without it.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
  - STATUS_CLAUSE
  - EXTRA_NOTE
-->
. ${TOOL_NAME} ${STATUS_CLAUSE} but is switched off in this session right now, so it cannot run. Continue without it.${EXTRA_NOTE}

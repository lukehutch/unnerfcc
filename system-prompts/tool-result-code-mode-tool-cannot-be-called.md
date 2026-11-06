<!--
name: 'Tool Result: Tool cannot be called from code in session'
description: >-
  Informs the model that a tool cannot be invoked from code in this session and
  to proceed without it.
ccVersion: 2.1.318
variables:
  - REASON_PREFIX
  - TOOL_NAME
-->
${REASON_PREFIX}${TOOL_NAME} can't be called from your code in this session. Go on without it.

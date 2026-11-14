<!--
name: 'Tool Result: Built-in tools unavailable on remote machine'
description: >-
  Model-facing error explaining that built-in tools do not run on the remote
  machine and directing using its MCP tools or omitting the target.
ccVersion: 2.1.325
variables:
  - MACHINE_NAME
  - TOOL_NAME
  - MACHINE_ID
  - MACHINE_PARAM_VALUE
-->
This session has none of its built-in tools on ${MACHINE_NAME}, so ${TOOL_NAME} did not run. Work on ${MACHINE_NAME} goes through its own tools (mcp__${MACHINE_ID}__…); omit "${MACHINE_PARAM_VALUE}" only for a call that is meant to run 

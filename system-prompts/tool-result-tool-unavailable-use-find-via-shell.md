<!--
name: 'Tool Result: Tool unavailable — use find via the shell'
description: >-
  Tool-error suffix stating the requested tool is not available in this session
  and pointing the model to `find` run through the shell tool.
ccVersion: 2.1.219
variables:
  - UNAVAILABLE_TOOL_NAME
  - SHELL_TOOL_NAME
-->
. ${UNAVAILABLE_TOOL_NAME} is not available in this session — find files with `find` via the ${SHELL_TOOL_NAME} tool instead.

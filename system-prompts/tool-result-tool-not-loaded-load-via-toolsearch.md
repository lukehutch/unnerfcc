<!--
name: 'Tool Result: Tool not loaded load via ToolSearch'
description: >-
  InputValidationError informing that a called tool was not loaded and must be
  batch-loaded via ToolSearch before calling again.
ccVersion: 2.1.310
variables:
  - TOOL_NAME
  - TOOL_SEARCH_TOOL_NAME
-->
InputValidationError: ${TOOL_NAME} did not run: it was not loaded when it was called. Unless ${TOOL_SEARCH_TOOL_NAME} has loaded it since, load it together with the other tools you expect to need, in one ${TOOL_SEARCH_TOOL_NAME} call (for example, query "select:${TOOL_NAME}", with the other names after it, comma-separated). Call it again once that result has come back, not in the same reply.

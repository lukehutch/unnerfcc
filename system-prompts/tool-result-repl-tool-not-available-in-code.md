<!--
name: 'Tool Result: Tool not available in code hint'
description: >-
  Model-facing hint telling the model that the named tool is not available
  inside code and must be called directly as its own tool call.
ccVersion: 2.1.329
variables:
  - TOOL_NAME
-->
Hint: ${TOOL_NAME} is not available in code. Call it directly, as a tool call of its own.

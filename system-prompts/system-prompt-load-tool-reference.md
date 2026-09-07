<!--
name: 'System Prompt: Load tool reference'
description: >-
  Instructs the model to use the specified tool, loading it with the given
  command if not already available.
ccVersion: 2.1.263
variables:
  - TOOL_NAME
  - LOAD_COMMAND
-->
with the `${TOOL_NAME}` tool (load it with ${LOAD_COMMAND} if it is not loaded yet)

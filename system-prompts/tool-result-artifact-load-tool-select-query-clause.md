<!--
name: 'Tool Result: Load tool with select query clause'
description: Instructs how to load the required tool using ToolSearch with a select query.
ccVersion: 2.1.257
variables:
  - TOOL_NAME
  - TOOL_SEARCH_TOOL_NAME
-->
the ${TOOL_NAME} tool (load it with ${TOOL_SEARCH_TOOL_NAME}, query `select:${TOOL_NAME}`, if it is not loaded)

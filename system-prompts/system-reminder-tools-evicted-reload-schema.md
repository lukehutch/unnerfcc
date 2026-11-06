<!--
name: 'System Reminder: Evicted tools reload schema'
description: >-
  Warns that previously loaded tool schemas were evicted from context and
  instructs reloading them before calling.
ccVersion: 2.1.318
variables:
  - TOOL_SEARCH_TOOL_NAME
-->
The following tools were loaded earlier in this conversation, but their schemas are no longer in your context. A call without the schema can have wrong or missing input. Before you call one of them, use ${TOOL_SEARCH_TOOL_NAME} with query "select:<name>[,<name>...]" to load its schema. Load only the tools that you need. The tools are:

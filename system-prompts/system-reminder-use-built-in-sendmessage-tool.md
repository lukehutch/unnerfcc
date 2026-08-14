<!--
name: 'System Reminder: Use the built-in SendMessage tool'
description: >-
  Names the built-in messaging tool to use, how to load it with a ToolSearch
  select query when it is deferred, and that an MCP or connector send_message
  tool is not a substitute for it.
ccVersion: 2.1.232
variables:
  - SEND_MESSAGE_TOOL_NAME
  - TOOL_SEARCH_TOOL_NAME
-->
the built-in ${SEND_MESSAGE_TOOL_NAME} tool (if it is not loaded yet, load it with ${TOOL_SEARCH_TOOL_NAME} query "select:${SEND_MESSAGE_TOOL_NAME}"; do not substitute an MCP or connector send_message tool for it)

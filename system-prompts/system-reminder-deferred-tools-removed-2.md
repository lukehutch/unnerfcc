<!--
name: 'System Reminder: Deferred tools no longer available'
description: reminder that deferred tools are gone because their MCP server disconnected
ccVersion: 2.1.218
variables:
  - TOOL_SEARCH_TOOL_NAME
  - REMOVED_TOOL_NAMES
-->
The following deferred tools are no longer available (their MCP server disconnected). Do not search for them — ${TOOL_SEARCH_TOOL_NAME} will return no match:
${REMOVED_TOOL_NAMES.join(`
`)}

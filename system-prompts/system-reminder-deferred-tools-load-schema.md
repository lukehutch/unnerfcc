<!--
name: 'System Reminder: Deferred tools load schema'
description: >-
  Lists deferred tools whose schemas are not yet loaded and instructs querying
  the search tool before calling them.
ccVersion: 2.1.318
variables:
  - TOOL_SEARCH_TOOL_NAME
-->
The following deferred tools are available via ${TOOL_SEARCH_TOOL_NAME}. Their schemas are NOT loaded. Use ${TOOL_SEARCH_TOOL_NAME} with query "select:<name>[,<name>...]" to load tool schemas before calling them:

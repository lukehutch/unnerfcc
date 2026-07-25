<!--
name: 'System Reminder: Do not search for removed tools'
description: >-
  Tail of a tool-removal notice telling the model not to search for the tools
  because the search tool will return no match.
ccVersion: 2.1.219
variables:
  - TOOL_SEARCH_TOOL_NAME
-->
. Do not search for them — ${TOOL_SEARCH_TOOL_NAME} will return no match.

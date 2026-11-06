<!--
name: 'Tool Description: MCP server reconnect query advice'
description: >-
  Advises querying the tool search tool with a server's name to reconnect once
  the server starts.
ccVersion: 2.1.318
variables:
  - TOOL_SEARCH_TOOL_NAME
-->
for now; a ${TOOL_SEARCH_TOOL_NAME} query that contains a server's name connects to it again, so once the server is running (for example after you start the app that serves it), search for its tools that way instead of reaching the server another way

<!--
name: 'Tool Result: ToolSearch reconnect query'
description: >-
  Explains how querying ToolSearch with an MCP server's name attempts
  reconnection with waits between tries.
ccVersion: 2.1.329
variables:
  - TOOL_SEARCH_TOOL
-->
. A ${TOOL_SEARCH_TOOL} query that contains a server's name connects to it again, with waits between tries, so if the server is still starting, wait and search again. Treat this as a connection failure, not a missing capability.

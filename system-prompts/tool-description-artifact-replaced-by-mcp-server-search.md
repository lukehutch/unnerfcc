<!--
name: 'Tool Description: Artifact replaced by MCP server (search)'
description: >-
  Informs that built-in Artifact tools were replaced by an MCP server and
  directs finding them via ToolSearch.
ccVersion: 2.1.321
variables:
  - MCP_SERVER_NAME
  - TOOL_SEARCH_TOOL
  - TOOL_SEARCH_METHOD
-->
. In this session the built-in Artifact tools were replaced by the tools of the MCP server '${MCP_SERVER_NAME}': call those instead. If one that you need is not in your tool list, find it with ${TOOL_SEARCH_TOOL}.${TOOL_SEARCH_METHOD}

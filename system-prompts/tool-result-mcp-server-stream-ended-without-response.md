<!--
name: 'Tool Result: MCP server stream ended without response'
description: >-
  Reports that an MCP server tool stream closed before answering, leaving the
  execution outcome unknown.
ccVersion: 2.1.293
variables:
  - MCP_SERVER_NAME
  - TOOL_NAME
  - DETAILS
-->
MCP server "${MCP_SERVER_NAME}" never answered tool "${TOOL_NAME}". ${DETAILS}

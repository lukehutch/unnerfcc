<!--
name: 'Tool Result: ListAgents MCP server connecting missing sessions'
description: >-
  Warns that an MCP server is still connecting so certain sessions may be
  missing from the listing.
ccVersion: 2.1.329
variables:
  - MCP_SERVER_NAME
  - MISSING_SESSIONS_LABEL
-->
the ${MCP_SERVER_NAME} MCP server is still connecting, so ${MISSING_SESSIONS_LABEL} may be missing from this listing

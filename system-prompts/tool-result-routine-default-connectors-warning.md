<!--
name: 'Tool Result: Routine default connectors attached warning'
description: >-
  Warns that account MCP connectors were attached by default to a routine and
  explains how to remove or customize them.
ccVersion: 2.1.318
variables:
  - ATTACHED_CONNECTORS
-->
⚠ No connectors were asked for (mcp_connections is empty or absent), but this routine has: ${ATTACHED_CONNECTORS}. The server attaches the account's connected connectors when none are named, and every run of this routine can use them. Tell the user. To remove them, call update on this routine with {"clear_mcp_connections": true}, or with mcp_connections holding only the entries to keep, copied from this response. An empty mcp_connections changes nothing.

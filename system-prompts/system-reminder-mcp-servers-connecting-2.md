<!--
name: 'System Reminder: MCP servers still connecting'
description: >-
  Lists MCP servers that are still connecting and instructs the model not to
  report capabilities as unavailable while connection is in progress.
ccVersion: 2.1.270
variables:
  - CONNECTING_SERVERS_LIST
-->
The following MCP servers are still connecting — their tools (typically named mcp__<server>__*) are not yet available but will be announced here once they connect:
${CONNECTING_SERVERS_LIST}

If the user's request might be served by one of these servers (even if they didn't name it explicitly), do not report the capability as unavailable while they are still connecting.

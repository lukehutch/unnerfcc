<!--
name: 'Tool Description: Artifact MCP server disconnected'
description: >-
  Informs that the MCP server replacing Artifact tools is disconnected and
  guides user notification and reconnection.
ccVersion: 2.1.310
variables:
  - SERVER_NAME
-->
. The Artifacts tools aren't available in this session right now: the MCP server '${SERVER_NAME}' that replaced the built-in Artifact tools isn't connected. Tell the user; /mcp can reconnect or re-enable it, or restarting Claude Code restores the tools.

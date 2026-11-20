<!--
name: 'Tool Result: MCP server unparseable message connection closed'
description: >-
  Informs that an MCP server sent an unparseable or oversized message resulting
  in a closed connection and no result, and advises asking for a smaller result
  on retry.
ccVersion: 2.1.329
variables:
  - MCP_SERVER_NAME
-->
MCP server ${MCP_SERVER_NAME} sent a message that was too large or could not be parsed, so Claude Code closed the connection and this mcp_call got no result. The server may have run the tool, so check whether the call took effect before retrying mcp_call. If the result may have been too large, ask the tool for a smaller one when you retry.

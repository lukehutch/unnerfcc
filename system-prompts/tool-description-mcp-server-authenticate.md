<!--
name: 'Tool Description: MCP server authentication'
description: >-
  Description of the auth tool exposed for an unauthenticated MCP server — call
  it to start OAuth and share the authorization URL with the user.
ccVersion: 2.1.219
variables:
  - MCP_SERVER_NAME
  - MCP_SERVER_URL
-->
The `${MCP_SERVER_NAME}` MCP server (${MCP_SERVER_URL}) is installed but requires authentication. Call this tool to start the OAuth flow — you'll receive an authorization URL to share with the user. Once the user completes authorization in their browser, the server's real tools will become available automatically.

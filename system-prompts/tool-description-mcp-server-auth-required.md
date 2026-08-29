<!--
name: 'Tool Description: MCP server authentication required'
description: >-
  Tool description prefix prompting to initiate OAuth flow for an installed MCP
  server requiring authentication.
ccVersion: 2.1.251
variables:
  - SERVER_URL
-->
" MCP server (${SERVER_URL}) is installed but requires authentication. Call this tool to start the OAuth flow — you'll receive an authorization URL to share with the user. Once the user completes authorization in their browser, the server's real tools will become 

<!--
name: 'Tool Parameter: OAuth Callback URL (remote)'
description: >-
  MCP OAuth tool callback_url param note: on remote sessions the callback page
  fails but the address-bar URL is valid; pass it here.
ccVersion: 2.1.219
variables:
  - MCP_SERVER_NAME
  - OAUTH_START_TOOL_NAME
-->
Complete an in-progress OAuth flow for the `${MCP_SERVER_NAME}` MCP server by submitting the callback URL. Call `${OAUTH_START_TOOL_NAME}` first to start the flow and get the authorization URL. After the user authorizes in their browser, the browser is redirected to a `http://localhost:<port>/callback?code=...&state=...` URL — on remote sessions that page fails to load, but the URL in the address bar is still valid. Pass that full URL here as `callback_url`.

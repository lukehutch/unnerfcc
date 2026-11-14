<!--
name: 'Tool Parameter: OAuth Callback URL (remote)'
description: >-
  Describes the callback_url parameter for completing remote MCP OAuth sign-in,
  including declining and terminal fallback rules.
ccVersion: 2.1.325
variables:
  - OAUTH_START_TOOL_NAME
-->
" MCP server by submitting the callback URL. Call `${OAUTH_START_TOOL_NAME}` first to start the flow and get the authorization URL. After the user authorizes in their browser, the browser is redirected to a `http://localhost:<port>/callback?code=...&state=...` URL — on remote sessions that page fails to load, but the URL in the address bar is still valid. Pass that full URL here as `callback_url`. If the user declines this call, do not retry it. If this session cannot ask them, tell them to finish signing in by running /mcp.

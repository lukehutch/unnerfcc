<!--
name: 'Tool Result: MCP OAuth flow timed out'
description: >-
  Instructs restarting the OAuth flow and asking the user for the full redirect
  URL from their browser address bar.
ccVersion: 2.1.325
variables:
  - OAUTH_START_TOOL_NAME
-->
; it may have timed out. Call `${OAUTH_START_TOOL_NAME}` to start a new one, then, once the user has approved it, ask them for the full URL in their browser's address bar.

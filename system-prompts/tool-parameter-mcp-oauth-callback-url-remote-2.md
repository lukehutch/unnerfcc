<!--
name: MCP OAuth callback_url (remote)
description: >-
  Explains that on a remote session the OAuth redirect page fails to load, so
  the user must paste the full address-bar URL back for the auth tool's
  callback_url.
ccVersion: 2.1.219
variables:
  - OAUTH_REDIRECT_URL
  - MCP_AUTH_TOOL_NAME
-->


This session is remote, so after authorizing the browser will try to load `${OAUTH_REDIRECT_URL}?code=...` and show a connection error — that's expected. Ask the user to copy the full URL from the browser's address bar and paste it into chat, then call `${MCP_AUTH_TOOL_NAME}` with that URL as `callback_url`.

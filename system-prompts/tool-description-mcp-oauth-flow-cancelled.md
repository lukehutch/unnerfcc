<!--
name: 'Tool Result: MCP OAuth flow cancelled'
description: >-
  MCP authenticate tool_result when the OAuth flow was cancelled by a newer
  attempt
ccVersion: 2.1.219
variables:
  - MCP_SERVER_NAME
  - AUTHENTICATE_TOOL_NAME
-->
The OAuth flow for ${MCP_SERVER_NAME} was cancelled (a newer attempt may have superseded it). Call `${AUTHENTICATE_TOOL_NAME}` again to restart.

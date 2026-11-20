<!--
name: 'Tool Result: MCP reconnect rate limited (429)'
description: >-
  Reports that an MCP server returned HTTP 429 on reconnect and instructs
  continuing without it rather than retrying.
ccVersion: 2.1.329
variables:
  - SERVER_NAME
-->
Claude Code tried to connect to ${SERVER_NAME} again, and it answered that it gets too many requests (429). A call or search does not try it again. Continue without this server, and tell the user if the task depends on it.

<!--
name: 'Tool Description: Do not use tool when user computer needed'
description: >-
  Model-facing guidance forbidding calling a no-op tool for tasks requiring the
  user's computer and directing using matching computer MCP tools.
ccVersion: 2.1.325
variables:
  - COMPUTER_MCP_SERVER_NAME
-->
When a task needs the user's own computer, do not use it, since it does nothing; use the mcp__${COMPUTER_MCP_SERVER_NAME}__ tool that fits, if you have one.

<!--
name: 'Tool Result: MCP reconnect failed with cooldown'
description: >-
  Reports that reconnecting to an MCP server failed and specifies how many
  seconds to wait before retrying.
ccVersion: 2.1.329
variables:
  - SERVER_NAME
  - RETRY_SECONDS
-->
Claude Code tried to connect to ${SERVER_NAME} again and could not. It can be tried again in ${RETRY_SECONDS} s.

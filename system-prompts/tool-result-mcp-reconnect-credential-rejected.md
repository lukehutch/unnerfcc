<!--
name: 'Tool Result: MCP reconnect credential rejected'
description: >-
  Reports that an MCP server rejected its configured header or headersHelper
  credential and advises continuing without it.
ccVersion: 2.1.329
variables:
  - SERVER_NAME
-->
Claude Code connected to ${SERVER_NAME} again, and it rejected the credential in its configuration (a header or headersHelper). The user needs to update it. Continue without this server, and tell them if the task depends on it.

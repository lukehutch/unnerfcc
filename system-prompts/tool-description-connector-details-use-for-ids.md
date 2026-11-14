<!--
name: 'Tool Description: Use connector details tool for directoryUuid and server_id'
description: >-
  Instructs the model to use the connector details tool with directoryUuid or
  server_id values rather than guessing IDs or passing names.
ccVersion: 2.1.325
variables:
  - SEARCH_MCP_REGISTRY_TOOL_NAME
-->
When you hold directoryUuid values from ${SEARCH_MCP_REGISTRY_TOOL_NAME}, or server_id values from your system prompt, and are about to describe those connectors to the user, use it for their details and install state; never guess ids or pass names.

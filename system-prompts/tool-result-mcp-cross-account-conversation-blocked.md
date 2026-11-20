<!--
name: 'Tool Result: MCP server blocked for cross-account conversation'
description: >-
  Explains that the conversation may include messages from another account,
  organization, or API key so it cannot use the server, directing the model to
  read docs with the fetch tool or have the user run /clear.
ccVersion: 2.1.329
variables:
  - FETCH_TOOL_NAME
-->
this conversation may include messages from another account, organization, or API key, so it can't use this server. Claude should read the docs pages with ${FETCH_TOOL_NAME} instead of trying again. To use this server, start a new conversation with /clear.

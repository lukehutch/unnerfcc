<!--
name: 'Tool Result: MCP structured content unread'
description: >-
  Warns the model that structured tool output from an MCP server was not read
  due to size or depth and advises checking if it ran before retrying.
ccVersion: 2.1.318
variables:
  - SERVER_NAME
  - TOOL_NAME
-->
The structured content in the response from MCP server "${SERVER_NAME}" for tool "${TOOL_NAME}" was not read here. This happens most often when it is too large, is nested too deep or holds a number that is too large. The tool may have run: check whether it did before calling it again, and ask for less data.

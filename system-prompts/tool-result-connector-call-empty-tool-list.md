<!--
name: 'Tool Result: Connector call empty connector tool list'
description: >-
  Refuses a connector call because no tools list is available for the connector
  to validate the tool name.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: Claude Code asked the model for a file's path for a tool of this connector but has no list of this connector's tools that shows any tool, and this call's tool name is not one it can check without one. Calling again may or may not work: reconnecting the connector lists its tools again (in a terminal: /mcp).

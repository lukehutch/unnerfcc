<!--
name: 'Tool Result: Connector call tool name not in tool list'
description: >-
  Refuses a connector call because the tool name does not match any tool
  provided by the connector.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: Claude Code asked the model for a file's path for a tool of this connector, and its list of this connector's tools has no tool under the exact name this call gave (it is shown here as Claude Code would show it), so it could not tell what this call would send. Check the name the call gave; if it is right, reconnecting the connector lists its tools again (in a terminal: /mcp), and the list may then hold such a tool.

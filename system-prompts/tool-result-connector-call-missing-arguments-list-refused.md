<!--
name: 'Tool Result: Connector call missing arguments list refused'
description: >-
  Refuses a connector call because the tool's argument list could not be
  verified, advising reconnecting via /mcp.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: Claude Code asked the model for a file's path for ${TOOL_NAME} but does not have ${TOOL_NAME}'s current list of arguments, so it could not check that no path is written as an argument's name. Calling again may or may not work: reconnecting the connector lists its tools again (in a terminal: /mcp), and the call then passes only if ${TOOL_NAME} lists every argument the call sets.

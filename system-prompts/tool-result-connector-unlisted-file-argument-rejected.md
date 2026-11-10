<!--
name: 'Tool Result: Connector unlisted file argument rejected'
description: >-
  Rejects tool call because it specifies an argument not declared in the
  connector's tool schema.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: this call has an argument that ${TOOL_NAME} does not list. You were asked for a file's path for ${TOOL_NAME}, and the name of an argument is sent to the connector as text too, so Claude Code sends ${TOOL_NAME} only the arguments it lists. Do not retry with that argument; you may call ${TOOL_NAME} with the arguments it lists.

<!--
name: 'Tool Result: Connector call unlisted argument refused'
description: >-
  Refuses a connector call that sets an argument not defined on the tool,
  preventing unintended text transmission.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: Claude Code asked for a file's path for ${TOOL_NAME}, and this call sets an argument that ${TOOL_NAME} does not list. The name of an argument goes to the connector as text too.

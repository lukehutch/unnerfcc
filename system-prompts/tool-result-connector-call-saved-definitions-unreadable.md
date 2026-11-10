<!--
name: 'Tool Result: Connector call saved definitions unreadable'
description: >-
  Refuses a connector call because saved tool definitions could not be read to
  verify safe file argument passing.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: Claude Code could not read the tool definitions saved in this conversation, so it could not tell whether this call would send a path as plain text. A new conversation avoids this.

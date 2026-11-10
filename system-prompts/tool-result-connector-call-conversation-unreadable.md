<!--
name: 'Tool Result: Connector call conversation unreadable'
description: >-
  Refuses a connector call because conversation state could not be read to check
  parameter safety.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: Claude Code could not read this conversation, so it could not tell whether this call would send a path as plain text. Calling again may or may not work. If it keeps happening, the fault is in Claude Code or in the program that runs it.

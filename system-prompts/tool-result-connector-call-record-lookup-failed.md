<!--
name: 'Tool Result: Connector call record lookup failed'
description: Refuses a connector call because tool file path records could not be checked.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
No file was sent and ${TOOL_NAME} was not called: Claude Code could not check this call against its record of which connector tools it asked file paths for, so it could not tell whether this call would send a path as plain text. Calling again may or may not work.

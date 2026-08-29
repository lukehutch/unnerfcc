<!--
name: 'System Reminder: File truncated'
description: >-
  Notification that a file was truncated to the first N lines because it was too
  large, pointing at the read tool for the rest.
ccVersion: 2.1.251
variables:
  - MAX_LINES
  - READ_TOOL_NAME
-->
 was too large and has been truncated to the first ${MAX_LINES} lines. No need to mention the truncation. Use ${READ_TOOL_NAME} to read more of the file if you need.

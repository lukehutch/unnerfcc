<!--
name: 'System Reminder: Paged file read — keep paging'
description: >-
  Tells the model the shown page is partial and to call Read with offset/limit
  for more rather than answering from this page alone.
ccVersion: 2.1.219
variables:
  - READ_TOOL_NAME
-->
 lines. Call ${READ_TOOL_NAME} with offset/limit to page through. Do NOT answer from this page alone if the answer may be further in the file.]

<!--
name: 'Tool Description: Monitor cloud session lifetime limits'
description: >-
  Warns that background monitors in this session may stop after replying and
  advises using foreground commands instead.
ccVersion: 2.1.310
variables:
  - FOREGROUND_TOOL_NAME
-->
In this session a monitor can be counted on only while you are working. After your reply it may stop at any time, often within a minute, and you are told so with the user's next message. To wait for one thing before you answer, run a foreground ${FOREGROUND_TOOL_NAME} command that exits when it happens; for anything longer, tell the user what to check and when.

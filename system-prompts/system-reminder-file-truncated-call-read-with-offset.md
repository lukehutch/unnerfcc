<!--
name: 'System Reminder: File truncated call read with offset'
description: >-
  Directs the model to call a specific tool with offset and limit parameters to
  fetch remaining file contents.
ccVersion: 2.1.318
variables:
  - PREFIX
  - PREVIEW
  - READ_TOOL
  - FILE_PATH
  - OFFSET
-->
${PREFIX}${PREVIEW} For the rest, call ${READ_TOOL} on ${FILE_PATH} with offset=${OFFSET} and a limit.

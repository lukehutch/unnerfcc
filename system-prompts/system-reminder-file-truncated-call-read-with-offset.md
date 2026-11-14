<!--
name: 'System Reminder: File truncated call read with offset'
description: >-
  Directs the model to call a specific tool with offset and limit parameters to
  fetch remaining file contents.
ccVersion: 2.1.325
variables:
  - PREFIX
  - PREVIEW
  - CONTINUATION_NOTE
  - READ_TOOL
  - FILE_PATH
  - OFFSET
-->
${PREFIX}${PREVIEW}${CONTINUATION_NOTE} For the rest, call ${READ_TOOL} on ${FILE_PATH} with offset=${OFFSET} and a limit.

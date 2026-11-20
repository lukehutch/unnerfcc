<!--
name: 'Tool Result: Images truncated to first N'
description: >-
  Informs the model that only the first N images were inspected and advises
  reading the others if still needed.
ccVersion: 2.1.329
variables:
  - MEDIA_LABEL
  - MAX_COUNT
  - READ_TOOL_NAME
-->
${MEDIA_LABEL}: only the first ${MAX_COUNT} were looked at. ${READ_TOOL_NAME} the others if you still need them.

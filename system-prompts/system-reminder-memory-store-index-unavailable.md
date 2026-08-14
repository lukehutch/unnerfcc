<!--
name: 'System Reminder: Memory store index could not be fetched'
description: >-
  Tells the model a connected store's memory index could not be fetched and to
  read it with the memory read tool when it needs it.
ccVersion: 2.1.231
variables:
  - STORE_INDEX_LABEL
  - MEMORY_READ_TOOL_NAME
-->
(${STORE_INDEX_LABEL} could not be fetched just now — call ${MEMORY_READ_TOOL_NAME} on it when you need it.)

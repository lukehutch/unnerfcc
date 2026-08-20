<!--
name: 'Tool Result: Memory store version conflict'
description: >-
  Tells the model the document changed concurrently and to read it again for a
  fresh version token before retrying the write.
ccVersion: 2.1.231
variables:
  - MEMORY_READ_TOOL_NAME
-->
The memory store reported a concurrent change to this document. Read it again with ${MEMORY_READ_TOOL_NAME} and retry with the fresh version token.

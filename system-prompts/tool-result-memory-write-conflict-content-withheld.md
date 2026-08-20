<!--
name: 'Tool Result: Memory write conflict (content withheld)'
description: >-
  Tells the model the conflicting memory document is over the read cap so its
  content is withheld, leaving a wholesale replacement at the current version or
  leaving it as is.
ccVersion: 2.1.231
variables:
  - CONTENT_BYTE_SIZE
  - READ_CAP_BYTES
  - MEMORY_READ_TOOL_NAME
  - CURRENT_VERSION
-->
 Its current content is ${CONTENT_BYTE_SIZE} bytes, over the ${READ_CAP_BYTES}-byte read cap, so it is withheld here and ${MEMORY_READ_TOOL_NAME} refuses it for the same reason; replace the document wholesale with if_version=${CURRENT_VERSION}, or leave it as is.

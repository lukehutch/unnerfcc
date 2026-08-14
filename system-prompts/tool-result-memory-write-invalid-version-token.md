<!--
name: 'Tool Result: Memory if_version is not a version token'
description: >-
  Tells the model the if_version value is not a version token and to pass the
  12-character token from its most recent read or write of the path, or the
  literal word new for a document that does not exist yet.
ccVersion: 2.1.231
variables:
  - MEMORY_READ_TOOL_NAME
  - MEMORY_WRITE_TOOL_NAME
-->
" is not a version token — pass the 12-character token from your most recent ${MEMORY_READ_TOOL_NAME} or ${MEMORY_WRITE_TOOL_NAME} of this path, or the literal word new for a document that does not yet exist.

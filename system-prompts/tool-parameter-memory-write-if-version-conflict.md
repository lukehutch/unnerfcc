<!--
name: 'Tool Parameter: Memory write version conflict handling'
description: >-
  Explains that a stale version or a new for an existing path is rejected with
  the current content and version, which the model merges into before calling
  the write tool again.
ccVersion: 2.1.231
variables:
  - MEMORY_WRITE_TOOL_NAME
-->
If the document changed since you read it, or you pass new for a path that already exists, the write is rejected and returns the current content (when it is within the read cap) and its version — merge your change into that content and call ${MEMORY_WRITE_TOOL_NAME} again with the returned version.

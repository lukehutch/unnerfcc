<!--
name: 'Tool Result: Memory write conflict (merge and retry)'
description: >-
  Returns the memory document's current content after a version conflict and
  tells the model to merge its change in and rewrite with the current
  if_version.
ccVersion: 2.1.231
variables:
  - MEMORY_WRITE_TOOL_NAME
  - CURRENT_VERSION
-->
 Its current content follows — merge your change into it and call ${MEMORY_WRITE_TOOL_NAME} again with if_version=${CURRENT_VERSION}.

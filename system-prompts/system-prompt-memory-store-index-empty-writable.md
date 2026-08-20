<!--
name: 'System Prompt: Empty memory index in a writable store'
description: >-
  Tells the model its memory index in the named store is empty and how to save a
  document and create the index that points to it.
ccVersion: 2.1.231
variables:
  - MEMORY_INDEX_FILENAME
  - MEMORY_STORE_NAME
  - MEMORY_WRITE_TOOL_NAME
-->
You have a memory index `/${MEMORY_INDEX_FILENAME}` in ${MEMORY_STORE_NAME} (currently empty). When you learn something worth persisting, save it as a document with ${MEMORY_WRITE_TOOL_NAME}, then create `/${MEMORY_INDEX_FILENAME}` with ${MEMORY_WRITE_TOOL_NAME} to hold its one-line pointer.

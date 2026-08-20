<!--
name: 'System Prompt: Empty memory index in a read-only store'
description: >-
  Tells the model its memory index in the named store is read-only and currently
  empty.
ccVersion: 2.1.231
variables:
  - MEMORY_INDEX_FILENAME
  - MEMORY_STORE_NAME
-->
You have a read-only memory index `/${MEMORY_INDEX_FILENAME}` in ${MEMORY_STORE_NAME} (currently empty).

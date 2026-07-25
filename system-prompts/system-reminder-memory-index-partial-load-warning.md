<!--
name: 'System Reminder: Memory Index Partial Load Warning'
description: >-
  Tool-result warning that a memory index file was truncated; instructs keeping
  index entries to one line and moving detail into topic files.
ccVersion: 2.1.219
variables:
  - MEMORY_INDEX_PATH
  - MEMORY_INDEX_SIZE
-->
${MEMORY_INDEX_PATH} is ${MEMORY_INDEX_SIZE}. Only part of it was loaded. Keep index entries to one line under ~200 chars; move detail into topic files.

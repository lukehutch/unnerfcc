<!--
name: 'System Reminder: Memory file partially loaded'
description: >-
  Warns that only part of an oversized memory file was loaded, and tells the
  model to keep each memory file focused on one topic.
ccVersion: 2.1.270
variables:
  - MEMORY_FILE_SIZE
  - LOADED_PORTION
-->
this memory file is ${MEMORY_FILE_SIZE}. Only part of it was loaded: ${LOADED_PORTION}. Keep each memory file focused on one topic.

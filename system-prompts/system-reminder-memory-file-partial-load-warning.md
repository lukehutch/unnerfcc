<!--
name: 'System Reminder: Memory file partially loaded'
description: >-
  Warns that only part of an oversized memory file was loaded, and tells the
  model to keep each memory file focused on one topic.
ccVersion: 2.1.219
variables:
  - MEMORY_FILE_SIZE
-->
this memory file is ${MEMORY_FILE_SIZE}. Only part of it was loaded. Keep each memory file focused on one topic.

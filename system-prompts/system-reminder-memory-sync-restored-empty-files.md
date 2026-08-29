<!--
name: 'System Reminder: Memory sync restored empty files'
description: >-
  Tells the model memory sync refilled locally-empty memory files from shared
  memory, since an empty file never overwrites a memory's shared content.
ccVersion: 2.1.251
variables:
  - RESTORED_MEMORY_FILE_COUNT
-->
Memory sync restored ${RESTORED_MEMORY_FILE_COUNT} memory file(s) that were empty (0 bytes) on this machine from shared memory — an empty file is never synced over a memory's shared content.

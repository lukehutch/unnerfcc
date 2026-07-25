<!--
name: 'Tool Result: Memory sync paused for this file''s store'
description: >-
  Post-write warning that sync is paused for this file's memory store, so the
  write was saved locally but is not persisted to shared memory.
ccVersion: 2.1.219
variables:
  - MEMORY_STORE_NAME
  - SYNC_PAUSE_REASON
-->
Memory sync is paused for this file's memory store (${MEMORY_STORE_NAME}): ${SYNC_PAUSE_REASON} This write was saved locally but is NOT being persisted to shared memory.

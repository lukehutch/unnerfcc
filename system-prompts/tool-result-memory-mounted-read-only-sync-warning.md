<!--
name: 'Tool Result: Memory store mounted read-only sync warning'
description: >-
  Warns that writes to a read-only mounted memory store will be overwritten on
  sync and are not in shared memory.
ccVersion: 2.1.251
-->
This file's memory store is mounted read-only: writes are never synced, and the next sync pull will overwrite local edits with server content. This write was saved locally only and is NOT in shared memory.

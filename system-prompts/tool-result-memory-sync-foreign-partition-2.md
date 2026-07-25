<!--
name: 'Tool result: Memory sync disabled (foreign partition)'
description: >-
  Model-facing memory-sync warning returned as PostToolUse additionalContext
  after a memory write, telling the model the write was saved locally but not
  synced because the directory holds another store's synced memory.
ccVersion: 2.1.219
-->
Memory sync is disabled for this file's directory: it already holds the synced memory of a different memory store (mount_dir_foreign_partition), so writes here are saved locally but are NOT synced to shared/server memory. To resolve it, rename or relocate the conflicting directory team/

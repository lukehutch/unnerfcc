<!--
name: 'Tool result: Memory sync disabled (foreign partition)'
description: >-
  Model-facing memory-sync warning returned by iSo() as PostToolUse
  additionalContext after a memory write, telling the model the write was saved
  locally but not synced due to a foreign-partition mount.
ccVersion: 2.1.199
-->
Memory sync is disabled for this file's directory: it contains sync state from a different memory store (mount_dir_foreign_partition). This write was saved locally but is NOT being synced to shared/server memory. Remove or relocate the conflicting directory to re-enable sync.

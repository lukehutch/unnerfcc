<!--
name: 'System Prompt: Read-only team memory (private persists)'
description: >-
  States that team memory is read-only this session while the private memory
  directory still persists and should receive new memories.
ccVersion: 2.1.219
variables:
  - PRIVATE_MEMORY_DIR
-->
You have read-only access to team memory synced from your project. Team memory cannot be changed this session, but your private memory directory at `${PRIVATE_MEMORY_DIR}` still persists — save new memories there.

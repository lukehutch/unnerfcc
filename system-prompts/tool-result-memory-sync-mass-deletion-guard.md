<!--
name: 'Tool Result: Memory sync mass-deletion guard'
description: >-
  Tells the model that a bulk disappearance of local memory files was treated as
  a wipe, shared memory was left unchanged, and large deletions must be done in
  smaller batches.
ccVersion: 2.1.219
variables:
  - MISSING_MEMORY_FILE_COUNT
-->
Memory sync did NOT delete anything from shared memory this cycle: ${MISSING_MEMORY_FILE_COUNT} synced memory files went missing from this session's disk at once, which almost always means the local memory folder was wiped rather than deliberately cleared. Shared memory is unchanged and the missing files will be restored on the next sync. If you really do intend to remove that many memories, delete them in smaller batches.

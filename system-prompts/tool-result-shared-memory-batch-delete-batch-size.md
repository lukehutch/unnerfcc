<!--
name: 'Tool Result: Shared memory batch delete batch size limit'
description: >-
  Instructs limiting memory deletion batches to a maximum file count after
  restoring missing files.
ccVersion: 2.1.318
variables:
  - MAX_DELETE_COUNT
-->
If you really do intend to remove that many memories, wait until the missing files have been restored, then delete at most ${MAX_DELETE_COUNT} at a time

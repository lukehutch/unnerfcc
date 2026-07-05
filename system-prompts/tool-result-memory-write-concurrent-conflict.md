<!--
name: Memory Write Concurrent-Write Conflict
description: >-
  Model-facing PostToolUse additionalContext telling the model its memory write
  was not saved due to a concurrent-write conflict and to re-read and re-apply
  the change.
ccVersion: 2.1.201
variables:
  - TOOL_RESULT_MEMORY_WRITE_CONCURRENT_CONFLICT_VAR_0
-->
Your recent write to the memory file ${TOOL_RESULT_MEMORY_WRITE_CONCURRENT_CONFLICT_VAR_0} was NOT saved to shared memory: another session updated the file first (concurrent-write conflict). The file on disk has been refreshed with the server's current version. Re-read it and re-apply your change if it is still wanted.

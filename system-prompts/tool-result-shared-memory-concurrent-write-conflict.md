<!--
name: 'Tool result: Shared memory concurrent-write conflict'
description: >-
  Model-facing post-tool-use notice returned when a memory-file write loses to a
  concurrent update, instructing the model to re-read and re-apply its change.
ccVersion: 2.1.199
variables:
  - TOOL_RESULT_SHARED_MEMORY_CONCURRENT_WRITE_CONFLICT_VAR_0
  - TOOL_RESULT_SHARED_MEMORY_CONCURRENT_WRITE_CONFLICT_VAR_1
-->
Your recent write to the memory file ${TOOL_RESULT_SHARED_MEMORY_CONCURRENT_WRITE_CONFLICT_VAR_0(TOOL_RESULT_SHARED_MEMORY_CONCURRENT_WRITE_CONFLICT_VAR_1)} was NOT saved to shared memory: another session updated the file first (concurrent-write conflict). The file on disk has been refreshed with the server's current version. Re-read it and re-apply your change if it is still wanted.

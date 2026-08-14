<!--
name: 'System Reminder: Memory store re-pick still applying'
description: >-
  Tells the model the session is no longer connected to the previous project
  memory while a /memory re-pick applies, so any carried store list or earlier
  tool results are stale until re-checked.
ccVersion: 2.1.231
variables:
  - MEMORY_TOOL_NAMES
  - MEMORY_LIST_TOOL_NAME
-->
 (a re-pick in /memory is still being applied). Any connected memory store list or shared memory index your system prompt may carry, and any ${MEMORY_TOOL_NAMES} results earlier in this conversation, are stale. Call ${MEMORY_LIST_TOOL_NAME} with no arguments to check what, if anything, is connected before relying on the memory tools again.

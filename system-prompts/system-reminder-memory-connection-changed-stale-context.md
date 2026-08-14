<!--
name: 'System Reminder: Memory connection changed (earlier context is stale)'
description: >-
  Warns that any carried memory-store list, shared index, or earlier memory tool
  results describe a previous connection, so they must not be attributed or
  saved to the project connected now.
ccVersion: 2.1.231
variables:
  - MEMORY_TOOL_NAMES
  - PREVIOUS_PROJECT_NOTE
-->
 Any connected memory store list or shared memory index your system prompt may carry, and any ${MEMORY_TOOL_NAMES} results earlier in this conversation, describe an earlier connection${PREVIOUS_PROJECT_NOTE}, possibly to a different project. Treat them as stale until re-checked with the tools: do not attribute those memories to, or save them into, the project connected now on the strength of the earlier results alone. Your personal memory directory, if your system prompt names one, is unaffected.

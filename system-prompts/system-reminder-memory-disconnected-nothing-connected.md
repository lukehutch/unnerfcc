<!--
name: 'System Reminder: Project memory disconnected'
description: >-
  Tells the model project memory is no longer connected, that any earlier store
  listing or memory-tool result is stale, and to fall back to the personal
  memory directory or say project memory is disconnected for this session.
ccVersion: 2.1.231
variables:
  - MEMORY_TOOL_NAMES
  - MEMORY_LIST_TOOL_NAME
-->
). Any connected memory store list or shared memory index your system prompt may carry, and any ${MEMORY_TOOL_NAMES} results earlier in this conversation, are stale, and nothing is connected for the memory tools to serve until the user reconnects in /memory (${MEMORY_LIST_TOOL_NAME} with no arguments reports what, if anything, is connected whenever you need to re-check). If the user asks you to remember something, use your personal memory directory if your system prompt names one; otherwise explain that project memory is disconnected for this session.

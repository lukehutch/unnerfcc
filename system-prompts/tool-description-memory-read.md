<!--
name: 'Tool Description: Memory read'
description: >-
  Model-facing description of the memory read tool — returns a document's
  content and last-updated time from the connected store named by store.
ccVersion: 2.1.231
variables:
  - MEMORY_LIST_TOOL_NAME
-->
Read a memory document. Returns its content and last-updated time. store is the id of the connected memory store to read from (call ${MEMORY_LIST_TOOL_NAME} with no arguments to see the connected stores).

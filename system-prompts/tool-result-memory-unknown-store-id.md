<!--
name: 'Tool Result: Unknown memory store id'
description: >-
  Tells the model the requested memory store is not connected to this session,
  lists the connected store ids, and points at the listing call.
ccVersion: 2.1.231
variables:
  - CONNECTED_STORE_IDS
  - MEMORY_LIST_TOOL_NAME
-->
 is connected to this session. Connected stores: ${CONNECTED_STORE_IDS}. Call ${MEMORY_LIST_TOOL_NAME} with no arguments to list them.

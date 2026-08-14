<!--
name: 'System Reminder: Connected memory stores for this session'
description: >-
  Header of the memory-reconnection notice listing the stores connected for the
  rest of the session, telling the model to pass a store id and to re-check the
  set with the listing tool whenever it is unsure.
ccVersion: 2.1.231
variables:
  - MEMORY_TOOL_NAMES
  - MEMORY_LIST_TOOL_NAME
-->
Connected memory stores for the rest of this session — pass an id as the ${MEMORY_TOOL_NAMES} tools' store argument, and call ${MEMORY_LIST_TOOL_NAME} with no arguments to re-check this set whenever you are unsure:

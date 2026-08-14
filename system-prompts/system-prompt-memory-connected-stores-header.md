<!--
name: 'System Prompt: Connected memory stores list'
description: >-
  Memory-section header introducing the connected memory stores, telling the
  model to pass a store id as the tools' store argument and to re-check the set
  with the listing tool when unsure which store to use.
ccVersion: 2.1.231
variables:
  - MEMORY_LIST_TOOL_NAME
-->
Connected memory stores — pass an id as the tools' store argument, and call ${MEMORY_LIST_TOOL_NAME} with no arguments to re-check this set whenever you are unsure which store to use:

<!--
name: 'Tool Description: Call memory_list early'
description: >-
  Tail of the memory_list tool description telling the model to consult memory
  early — always before saying it does not have something — and to read any
  listed document that looks relevant.
ccVersion: 2.1.231
variables:
  - MEMORY_LIST_TOOL_NAME
  - MEMORY_READ_TOOL_NAME
-->
Call ${MEMORY_LIST_TOOL_NAME} early when context about the project or the work in it would help — and always before telling the user you do not have something. If a listed document looks relevant, ${MEMORY_READ_TOOL_NAME} it.

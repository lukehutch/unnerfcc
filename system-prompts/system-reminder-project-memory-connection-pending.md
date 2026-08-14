<!--
name: 'System Reminder: Project memory connection pending'
description: >-
  Tells the model the project memory the user picked in /memory is still
  connecting and to call the store-listing tool before relying on the memory
  tools.
ccVersion: 2.1.231
variables:
  - MEMORY_TOOL_FAMILY_NAME
  - MEMORY_LIST_STORES_TOOL_NAME
-->
The user picked a project's shared memory in /memory and the connection is still being set up; nothing is connected yet. Before relying on the ${MEMORY_TOOL_FAMILY_NAME} tools, call ${MEMORY_LIST_STORES_TOOL_NAME} with no arguments: once it lists connected stores, read your teammates' shared memories and save new shared learnings through those tools as their prompts describe. Your personal memory directory, if your system prompt names one, is unaffected either way.

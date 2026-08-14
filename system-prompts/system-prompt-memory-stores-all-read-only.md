<!--
name: 'System Prompt: All connected memory stores are read-only'
description: >-
  Memory-section clause telling the model that every connected store is
  read-only this session, so memory write calls are refused.
ccVersion: 2.1.231
variables:
  - MEMORY_WRITE_TOOL_NAME
-->
Every connected store is read-only in this session: ${MEMORY_WRITE_TOOL_NAME} calls are refused.

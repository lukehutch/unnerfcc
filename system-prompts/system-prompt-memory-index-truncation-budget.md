<!--
name: 'System Prompt: Memory index truncation budget'
description: >-
  Warns that the memory index file is loaded into conversation context and
  truncated past a line limit, so it must stay concise.
ccVersion: 2.1.219
variables:
  - INDEX_LINE_LIMIT
-->
- The index file is loaded into your conversation context — lines after ${INDEX_LINE_LIMIT} will be truncated, so keep it concise

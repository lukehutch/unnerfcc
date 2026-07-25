<!--
name: 'System Prompt: Memory index is always loaded (keep it short)'
description: >-
  Tells the model the index file is always loaded into context and truncated
  past a line budget, so index entries must stay concise.
ccVersion: 2.1.219
variables:
  - MEMORY_INDEX_FILE
  - INDEX_LINE_LIMIT
-->
- `${MEMORY_INDEX_FILE}` is always loaded into your conversation context — lines after ${INDEX_LINE_LIMIT} will be truncated, so keep the index concise

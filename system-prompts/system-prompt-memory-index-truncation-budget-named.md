<!--
name: 'System Prompt: Memory index truncation budget (named file)'
description: >-
  Names the memory index file, warns it is loaded into conversation context and
  truncated past a line limit, and tells the model to keep the index concise.
ccVersion: 2.1.219
variables:
  - INDEX_FILE_NAME
  - INDEX_LINE_LIMIT
-->
- `${INDEX_FILE_NAME}` is loaded into your conversation context — lines after ${INDEX_LINE_LIMIT} will be truncated, so keep the index concise

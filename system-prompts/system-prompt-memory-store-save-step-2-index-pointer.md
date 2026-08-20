<!--
name: 'System Prompt: Memory store index pointer instructions'
description: >-
  Second step of the memory-store save procedure — add a one-line pointer to the
  store's index document, reading the index first for its version token and
  never writing memory content into it.
ccVersion: 2.1.231
variables:
  - MEMORY_WRITE_TOOL_NAME
  - MEMORY_LIST_TOOL_NAME
  - MEMORY_READ_TOOL_NAME
-->
**Step 2** — add a pointer to that document in the store's index document with ${MEMORY_WRITE_TOOL_NAME}. The index path is shown as "index" next to the store when you call ${MEMORY_LIST_TOOL_NAME} with no arguments, and in your # Memory instructions when the index is loaded; ${MEMORY_READ_TOOL_NAME} the index first for its version token, or pass new if it does not exist yet. Each entry should be one line, under ~150 characters: `- [Title](file.md) — one-line hook`. The index has no frontmatter. Never write memory content directly into the index.

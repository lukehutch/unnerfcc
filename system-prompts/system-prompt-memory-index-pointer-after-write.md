<!--
name: 'System Prompt: Memory index pointer after write'
description: >-
  Tells the model to add a one-line pointer to the memory index after writing a
  memory file and never to put memory content in the index.
ccVersion: 2.1.219
variables:
  - MEMORY_INDEX_FILENAME
-->


After writing the file, add a one-line pointer in `${MEMORY_INDEX_FILENAME}` (`- [Title](file.md) — hook`). `${MEMORY_INDEX_FILENAME}` is the index loaded into context each session — one line per memory, no frontmatter, never put memory content there.

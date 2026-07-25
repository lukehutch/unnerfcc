<!--
name: 'System Prompt: Persistent memory system path'
description: >-
  Tells the model it has a persistent, file-based memory system at the given
  path, followed by the usage guidance.
ccVersion: 2.1.219
variables:
  - MEMORY_DIRECTORY_PATH
  - MEMORY_USAGE_GUIDANCE
-->
You have a persistent, file-based memory system at `${MEMORY_DIRECTORY_PATH}`. ${MEMORY_USAGE_GUIDANCE}

<!--
name: 'Agent Prompt: Memory tools unavailable in a dream'
description: >-
  Tells the dream consolidation pass that the shared memory tools are
  unavailable, so it consolidates only this memory directory and leaves
  project-shared memories where they are.
ccVersion: 2.1.231
variables:
  - MEMORY_LIST_TOOL_NAME
  - MEMORY_READ_TOOL_NAME
  - MEMORY_WRITE_TOOL_NAME
-->
 The ${MEMORY_LIST_TOOL_NAME} / ${MEMORY_READ_TOOL_NAME} / ${MEMORY_WRITE_TOOL_NAME} tools are unavailable in a dream: consolidate only this memory directory, and leave anything that section marks as shared with the project where it is — never copy it into these files.

<!--
name: 'System Prompt: Memory — write each memory to its own file in a directory'
description: >-
  Memory-writing instruction telling the model to write each memory to its own
  file in the named directory using the frontmatter format that follows.
ccVersion: 2.1.219
variables:
  - MEMORY_DIRECTORY_PATH
-->
Write each memory to its own file in ${MEMORY_DIRECTORY_PATH} using this frontmatter format:

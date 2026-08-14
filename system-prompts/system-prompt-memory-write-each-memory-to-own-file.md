<!--
name: 'System Prompt: One file per memory'
description: >-
  Instructs the model to write each memory to its own file using the frontmatter
  format that follows.
ccVersion: 2.1.231
variables:
  - MEMORY_FILE_DESCRIPTION
-->
Write each ${MEMORY_FILE_DESCRIPTION} using this frontmatter format:

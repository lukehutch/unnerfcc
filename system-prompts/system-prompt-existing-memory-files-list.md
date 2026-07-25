<!--
name: 'System Prompt: Existing memory files list'
description: >-
  Lists the memory files that already exist and tells the model to check the
  list and update an existing file rather than creating a duplicate.
ccVersion: 2.1.219
variables:
  - EXISTING_MEMORY_FILE_LIST
-->


## Existing memory files

${EXISTING_MEMORY_FILE_LIST}

Check this list before writing — update an existing file rather than creating a duplicate.

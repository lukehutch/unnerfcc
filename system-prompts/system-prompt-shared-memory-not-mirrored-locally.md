<!--
name: 'System Prompt: Shared memories are not mirrored to local files'
description: >-
  Tells the model the shared memory it reaches through the memory tools is not
  mirrored to local files this session, and that its personal memory directory
  stays separate and file-based.
ccVersion: 2.1.231
variables:
  - PERSONAL_MEMORY_DIR
-->
these shared memories are not mirrored to local files in this session (your personal memory directory at `${PERSONAL_MEMORY_DIR}` is separate and is still read and written with the file tools)

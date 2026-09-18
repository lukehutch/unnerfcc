<!--
name: 'System Reminder: Memory file not loaded due to special file or symlink'
description: >-
  Warns that a memory file or folder is a symlink or special file outside the
  working copy, making agent memory read-only.
ccVersion: 2.1.277
variables:
  - MEMORY_FILE_NAME
-->
Your ${MEMORY_FILE_NAME} was not loaded: it or its folder is a link or a special file, or could not be verified to be inside this working copy. Treat this agent memory as read-only in this session: do not create or write ${MEMORY_FILE_NAME} or other files in its folder.

<!--
name: 'System Reminder: Save task files tool instructions'
description: >-
  Instructs calling the save tool with task ID and file metadata to persist task
  files.
ccVersion: 2.1.310
variables:
  - SAVE_TOOL_NAME
-->
To save some, call ${SAVE_TOOL_NAME} with this task's task_id and, for each file, its id as file_id, its size as bytes, and as save_as the save_as on its line if one is given, else its name; names here are JSON strings, so give save_as as the same string.

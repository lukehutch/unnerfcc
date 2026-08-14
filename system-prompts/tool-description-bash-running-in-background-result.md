<!--
name: 'Tool Result: Command Running In Background'
description: >-
  Bash tool_result head reporting that a command was moved to the background,
  with its ID and the file its output is being written to.
ccVersion: 2.1.231
variables:
  - BACKGROUND_TASK_ID
  - OUTPUT_FILE_PATH
-->
Command running in background with ID: ${BACKGROUND_TASK_ID}. Output is being written to: ${OUTPUT_FILE_PATH}.

<!--
name: 'Tool Result: Command timed out and moved to background'
description: >-
  Bash tool result reporting that the command outlived its timeout and now runs
  in the background, with its id and the file its output goes to.
ccVersion: 2.1.231
variables:
  - BACKGROUND_TASK_ID
  - OUTPUT_FILE_PATH
-->
s timeout and was moved to the background (ID: ${BACKGROUND_TASK_ID}). Output is being written to: ${OUTPUT_FILE_PATH}.

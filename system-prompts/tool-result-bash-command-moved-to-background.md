<!--
name: 'Tool Result: Command moved to background after duration'
description: >-
  Reports that a command was moved to the background after running for a
  duration, with task ID and output file path.
ccVersion: 2.1.318
variables:
  - TASK_ID
  - DURATION_SECONDS
  - OUTPUT_FILE_PATH
-->
Command was moved to the background (ID: ${TASK_ID}) after running for ${DURATION_SECONDS}s. Output is being written to: ${OUTPUT_FILE_PATH}.

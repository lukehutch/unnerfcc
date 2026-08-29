<!--
name: 'Tool Result: Command backgrounded for incoming message'
description: >-
  Informs the model that a running command was moved to the background so an
  incoming message could be delivered.
ccVersion: 2.1.251
variables:
  - BACKGROUND_TASK_ID
  - OUTPUT_FILE_PATH
-->
Command was moved to the background (ID: ${BACKGROUND_TASK_ID}) so that a message that arrived while it was running can reach you; it was not interrupted. Output is being written to: ${OUTPUT_FILE_PATH}.

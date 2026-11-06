<!--
name: 'Tool Result: Command still running in background'
description: >-
  Notifies the model that a command timed out or is still running and continues
  as a background task streaming to a file.
ccVersion: 2.1.318
variables:
  - TIMEOUT_OR_STATUS
  - TASK_ID
-->
[still running] ${TIMEOUT_OR_STATUS} It was NOT killed: it continues as background task ${TASK_ID}, and its output streams to 

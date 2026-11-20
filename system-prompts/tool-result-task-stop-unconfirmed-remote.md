<!--
name: 'Tool Result: Remote task stop unconfirmed'
description: >-
  Informs the model that a remote task may still be running because its host
  machine did not confirm the stop and no completion notice will arrive.
ccVersion: 2.1.329
variables:
  - TASK_STOP_TOOL_NAME
-->
 may still be running: the machine that runs it did not confirm the stop. Another ${TASK_STOP_TOOL_NAME} cannot reach it, and no notice will come when it ends.

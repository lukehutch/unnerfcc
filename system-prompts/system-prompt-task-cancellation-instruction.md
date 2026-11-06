<!--
name: 'System Prompt: Task cancellation instruction'
description: >-
  Instructs how to stop a running task by calling the cancellation tool with its
  task ID.
ccVersion: 2.1.318
variables:
  - CANCEL_TOOL_NAME
  - TASK_ID
-->
 To stop it, use ${CANCEL_TOOL_NAME} with task_id "${TASK_ID}".

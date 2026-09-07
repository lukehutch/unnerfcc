<!--
name: 'Tool Result: Workflow still running stop first'
description: >-
  Error indicating that a workflow task is still running and must be stopped
  before resuming.
ccVersion: 2.1.263
variables:
  - WORKFLOW_ID
  - TASK_ID
  - STOP_TOOL
-->
Workflow ${WORKFLOW_ID} is still running (task ${TASK_ID}). Stop it first with ${STOP_TOOL}({taskId: "${TASK_ID}"}) before resuming.

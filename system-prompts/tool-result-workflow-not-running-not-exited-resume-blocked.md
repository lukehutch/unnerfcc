<!--
name: 'Tool Result: Workflow not running not exited resume blocked'
description: >-
  Error warning that a workflow's run has not exited and resuming would cause
  duplicate agents.
ccVersion: 2.1.263
variables:
  - WORKFLOW_ID
  - TASK_ID
  - STOP_TOOL
-->
Workflow ${WORKFLOW_ID} is not running but its run has not exited yet (task ${TASK_ID}). Resuming now would run two copies of its agents against the same journal. Run ${STOP_TOOL}({taskId: "${TASK_ID}"}) on it or wait for it to exit.

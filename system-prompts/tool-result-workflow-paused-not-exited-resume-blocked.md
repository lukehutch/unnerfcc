<!--
name: 'Tool Result: Workflow paused not exited resume blocked'
description: >-
  Error warning that resuming a paused workflow whose run has not yet exited
  would run duplicate agents.
ccVersion: 2.1.263
variables:
  - WORKFLOW_ID
  - TASK_ID
-->
Workflow ${WORKFLOW_ID} is paused but its run has not exited yet (task ${TASK_ID}); its agents are being stopped. Resuming now would run two copies of its agents against the same journal — wait for it to exit.

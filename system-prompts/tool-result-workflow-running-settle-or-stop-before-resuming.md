<!--
name: 'Tool Result: Workflow running settle or stop before resuming'
description: >-
  Advises waiting for a running workflow to settle or stopping it before
  resuming.
ccVersion: 2.1.263
variables:
  - WORKFLOW_ID
  - STOP_TOOL
-->
Workflow ${WORKFLOW_ID} is still running. Wait for it to settle, or stop it first with ${STOP_TOOL}, before resuming.

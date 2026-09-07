<!--
name: 'Tool Result: Agent still stopping resume error'
description: >-
  Error message stating that the target agent is still stopping from a previous
  run and cannot yet be resumed.
ccVersion: 2.1.263
variables:
  - AGENT_ID
  - COMMAND_NAME
-->
Agent ${AGENT_ID} is still stopping — its previous run was stopped but has not exited. Re-run ${COMMAND_NAME} on it or wait for it to exit before resuming.

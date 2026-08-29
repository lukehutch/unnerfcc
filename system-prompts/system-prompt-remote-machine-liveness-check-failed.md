<!--
name: 'System Prompt: Remote machine liveness check failed'
description: >-
  Notes that a remote machine failed a liveness check and will be checked again
  on next use.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
- ${MACHINE_NAME}: did not answer a liveness check; the next call naming it checks again.

<!--
name: 'System Prompt: Remote machine unreachable'
description: >-
  Notes that a remote machine is currently unreachable and calls to it will
  fail.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
- ${MACHINE_NAME}: not reachable right now; calls naming it will fail until it reconnects.

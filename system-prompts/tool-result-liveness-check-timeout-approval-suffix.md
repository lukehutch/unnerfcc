<!--
name: 'Tool Result: Liveness check timeout during approval suffix'
description: >-
  Suffix message explaining that approval was never sent because the connection
  backed up, prompting a retry.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
s — this session's connection to the service was backed up — so the user's approval was never sent and the pending request on ${MACHINE_NAME} is withdrawn; nothing ran. This is not a problem with ${MACHINE_NAME}; send the call again and the user will be asked once more.

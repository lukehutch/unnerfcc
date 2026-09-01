<!--
name: 'Tool Result: Remote machine disconnected retry guidance'
description: >-
  Guidance against retrying non-idempotent commands until remote machine
  reconnects.
ccVersion: 2.1.257
variables:
  - MACHINE_NAME
-->
. Do not retry non-idempotent commands on ${MACHINE_NAME} until ${MACHINE_NAME} reconnects; continue with work that doesn't need it and say what you could not verify.

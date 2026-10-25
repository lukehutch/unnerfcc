<!--
name: 'Tool Result: Remote machine disconnected retry guidance'
description: >-
  Guidance against retrying non-idempotent commands until remote machine
  reconnects.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
-->
${PREFIX} Do not retry non-idempotent commands on ${MACHINE_NAME} until ${MACHINE_NAME} reconnects, and do not call it again 

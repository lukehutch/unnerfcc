<!--
name: 'Tool Result: Remote machine tool exclusive to machine'
description: >-
  Notes that a tool exists only on the remote machine and cannot run until
  updated.
ccVersion: 2.1.251
variables:
  - TOOL_NAME
  - MACHINE_NAME
-->
${TOOL_NAME} exists only on ${MACHINE_NAME}, so it cannot run from this session until then.

<!--
name: 'Tool Result: Command not run stale files guard'
description: >-
  Tool result stating a forwarded command was blocked to prevent operating on
  stale remote files.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - REASON
  - RESOLUTION
-->
Not run on ${MACHINE_NAME}: ${REASON}, so the command would have acted on stale files. ${MACHINE_NAME} was not contacted. What clears it: ${RESOLUTION}.

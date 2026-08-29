<!--
name: 'Tool Result: Sync changes in flight deferred'
description: >-
  Notice that remote changes are in transit and instructing how to read files
  directly on the machine in the meantime.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - ARGUMENT_NAME
-->
${MACHINE_NAME} says it sent what that command changed, but it has not reached this session yet; it is taken in when it lands — until then, read those files on ${MACHINE_NAME} (the ${ARGUMENT_NAME} argument).

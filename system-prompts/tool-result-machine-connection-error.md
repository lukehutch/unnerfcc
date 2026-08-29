<!--
name: 'Tool Result: Machine connection error'
description: >-
  Tool result indicating the connection to the machine returned an error and
  command execution status is unknown.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - ERROR_MESSAGE
-->
The connection to ${MACHINE_NAME} answered with an error: ${ERROR_MESSAGE} — ${MACHINE_NAME}'s Claude Code did not report running the call; whether it ran there is not known, so check its effect before repeating it.

<!--
name: 'Tool Result: Liveness check timeout suffix'
description: >-
  Suffix message explaining that a backed-up service connection prevented the
  call from being sent.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
s — this session's connection to the service was backed up; the call was not sent and nothing ran. This is not a problem with ${MACHINE_NAME}; try the call again.

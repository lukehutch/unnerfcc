<!--
name: 'Tool Result: Call withdrawn due to backed up connection'
description: >-
  Suffix message explaining that a call timed out in the queue due to a backed
  up connection and was withdrawn.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
s — this session's connection to the service was backed up — so it was withdrawn while still queued here. Most likely nothing ran on ${MACHINE_NAME}: if the call reaches it late, its withdrawal arrives with it (for a command with side effects, check before repeating it). This is not a problem with ${MACHINE_NAME}; try the call again.

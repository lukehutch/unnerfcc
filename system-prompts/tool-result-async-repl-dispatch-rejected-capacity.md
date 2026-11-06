<!--
name: 'Tool Result: Async REPL dispatch rejected due to pending capacity'
description: >-
  Informs the model that async REPL evaluation was rejected because too many
  evals are pending.
ccVersion: 2.1.318
variables:
  - PENDING_COUNT
-->
async REPL dispatch rejected: ${PENDING_COUNT} evals already waiting or running — wait for their settles (Poll) before dispatching more

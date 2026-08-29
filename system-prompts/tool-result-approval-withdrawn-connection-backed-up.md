<!--
name: 'Tool Result: Approval withdrawn due to backed up connection'
description: >-
  Suffix message explaining that approval timed out in queue and was withdrawn,
  advising to re-send the call.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
s — this session's connection to the service was backed up — so it was withdrawn while still queued here, and the pending request on ${MACHINE_NAME} with it. Most likely nothing ran: if the approval still reaches ${MACHINE_NAME} late, its cancellation arrives with it (for a command with side effects, check before repeating it). This is not a problem with ${MACHINE_NAME}; send the call again and the user will be asked once more.

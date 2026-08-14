<!--
name: 'Tool Result: Plan approval not written to inbox'
description: >-
  Tells the model its plan approval never reached the named agent's inbox, so
  nothing was sent and the write should be retried.
ccVersion: 2.1.231
variables:
  - AGENT_NAME
-->
Failed to write the plan approval to ${AGENT_NAME}'s inbox — nothing was sent. Try again.

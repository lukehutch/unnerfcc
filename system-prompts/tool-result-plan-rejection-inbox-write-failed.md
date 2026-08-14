<!--
name: 'Tool Result: Plan rejection not written to inbox'
description: >-
  Tells the model its plan rejection never reached the named agent's inbox, so
  nothing was sent and the write should be retried.
ccVersion: 2.1.231
variables:
  - AGENT_NAME
-->
Failed to write the plan rejection to ${AGENT_NAME}'s inbox — nothing was sent. Try again.

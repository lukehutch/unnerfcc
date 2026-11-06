<!--
name: 'Tool Result: Send to project context already delivered'
description: >-
  Informs that context was already delivered earlier in the turn and instructs
  calling the proposal tool.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
This run’s context was delivered by an earlier call in this turn and is not returned twice. Work from that result, then call `${TOOL_NAME}` with the brief.

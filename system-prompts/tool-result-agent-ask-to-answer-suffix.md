<!--
name: 'Tool Result: Agent ask to answer suffix'
description: >-
  Model-facing clause instructing how to ask an agent to reply with a specific
  target or format.
ccVersion: 2.1.329
variables:
  - TOOL_CALL
  - RESPONSE_TARGET
-->
 ${TOOL_CALL}) asking it to answer with ${RESPONSE_TARGET}.

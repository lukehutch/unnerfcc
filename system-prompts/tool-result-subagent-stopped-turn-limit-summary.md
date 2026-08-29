<!--
name: 'Tool Result: Subagent stopped at turn limit summary'
description: >-
  Summarizes that a subagent stopped at its turn limit and provides instructions
  to send a message to continue.
ccVersion: 2.1.251
variables:
  - TURN_LIMIT
  - SEND_MESSAGE_TOOL_NAME
-->
stopped at its ${TURN_LIMIT}-turn limit (partial result; ${SEND_MESSAGE_TOOL_NAME} to task-id to continue)

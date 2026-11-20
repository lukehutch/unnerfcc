<!--
name: 'Tool Result: Ask agent if output file unreadable'
description: >-
  Instructs asking the specified agent via SendMessage if its output file cannot
  be read and its result is not yet held.
ccVersion: 2.1.329
variables:
  - AGENT_ID
  - SEND_MESSAGE_TOOL_NAME
-->
 (if you cannot read it and do not already have its result, ask agent ${AGENT_ID} with ${SEND_MESSAGE_TOOL_NAME})

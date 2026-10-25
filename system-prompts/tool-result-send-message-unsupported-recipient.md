<!--
name: 'Tool Result: SendMessage unsupported recipient'
description: >-
  Explains that SendMessage carries only plain text to agents within the current
  session or main.
ccVersion: 2.1.310
variables:
  - SEND_MESSAGE_TOOL
  - SPAWN_TOOL
-->
Not sent. In this session ${SEND_MESSAGE_TOOL} carries only plain text, and only to agents of this session: an agent launched in it with the ${SPAWN_TOOL} tool or, from a subagent, "main". Set `to` to such an agent's name, to the agentId from its spawn result, or to "main".

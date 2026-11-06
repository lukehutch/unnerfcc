<!--
name: 'Tool Result: Agent container restart unresumed'
description: >-
  Informs the model that an agent stopped when its container restarted and was
  not resumed, advising sending a message or launching anew.
ccVersion: 2.1.318
variables:
  - AGENT_ID
-->
This call stood for agent ${AGENT_ID}, which stopped when the container was restarted. This call does not resume it and launched nothing. Send agent ${AGENT_ID} a message, or launch a new agent, if you still need the work.

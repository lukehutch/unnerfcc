<!--
name: 'Tool Result: Agent not resumed due to stopped turn or waiting message'
description: >-
  Informs the model that an agent was not resumed because the current turn was
  stopped or a newer user message is waiting.
ccVersion: 2.1.329
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID} was not resumed: this turn was stopped, or a newer message from the user is waiting. It can be resumed in the turn that answers that message.

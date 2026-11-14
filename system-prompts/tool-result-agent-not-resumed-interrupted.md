<!--
name: 'Tool Result: Agent not resumed due to interruption'
description: >-
  Informs the model that resuming an agent was interrupted before the agent
  started and the message was not delivered.
ccVersion: 2.1.325
variables:
  - AGENT_ID
-->
Agent "${AGENT_ID}" was not resumed, and your message was not delivered: this call was interrupted before the agent started.

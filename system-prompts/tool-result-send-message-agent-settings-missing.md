<!--
name: 'Tool Result: SendMessage agent settings missing'
description: >-
  Informs the model that the target agent has no saved settings in this session
  and advises starting a new agent.
ccVersion: 2.1.310
variables:
  - AGENT_NAME
-->
Not sent. This session has no saved settings for agent ${AGENT_NAME} that it can read: the agent never ran here, or its settings were lost. Start a new agent if the work is still needed.

<!--
name: 'Tool Result: Resume Agent Type Settings Lost'
description: >-
  Reports that saved settings for the agent type were lost, directing starting a
  new agent.
ccVersion: 2.1.310
variables:
  - AGENT_ID
-->
This session no longer has the saved settings of agent ${AGENT_ID}, so it cannot be resumed as the type it ran as. Start a new agent if the work is still needed.

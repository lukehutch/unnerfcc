<!--
name: 'Tool Result: Resume Agent Type Missing or Reassigned'
description: >-
  Reports that the agent type is not listed or has been reassigned, suggesting
  retrying or starting a new agent.
ccVersion: 2.1.310
variables:
  - AGENT_ID
-->
The agent type that agent ${AGENT_ID} ran as is not on this session's list right now, or its name now belongs to a different type. Try once more; if that fails too, start a new agent.

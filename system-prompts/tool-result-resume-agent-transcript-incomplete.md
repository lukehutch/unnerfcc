<!--
name: 'Tool Result: Resume Agent Transcript Incomplete'
description: >-
  Reports that part of the agent transcript is missing and advises starting a
  new agent.
ccVersion: 2.1.310
variables:
  - AGENT_ID
-->
Part of agent ${AGENT_ID}'s transcript is missing, so it cannot go on from where it stopped. Start a new agent if the work is still needed.

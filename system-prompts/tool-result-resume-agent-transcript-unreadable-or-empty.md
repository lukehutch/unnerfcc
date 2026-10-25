<!--
name: 'Tool Result: Resume Agent Transcript Unreadable or Empty'
description: >-
  Reports that the agent's stored transcript is unreadable or empty, suggesting
  retrying or starting a new agent.
ccVersion: 2.1.310
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID}'s stored transcript could not be read, or is empty. Send the message again, or start a new agent if that fails too.

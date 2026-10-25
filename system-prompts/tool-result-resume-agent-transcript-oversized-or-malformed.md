<!--
name: 'Tool Result: Resume Agent Transcript Oversized or Malformed'
description: >-
  Reports that the agent transcript is too large or contains malformed
  timestamps, advising starting a new agent.
ccVersion: 2.1.310
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID}'s earlier transcript is too large to load, or has a row with a malformed timestamp. Sending the message again will not help. Start a new agent if the work is still needed.

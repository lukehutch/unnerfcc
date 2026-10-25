<!--
name: 'Tool Result: Resume Agent Transcript Unexpected Encoding'
description: >-
  Reports that the agent transcript arrived in an unexpected encoding,
  suggesting retrying or starting a new agent.
ccVersion: 2.1.310
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID}'s earlier transcript arrived in an encoding that was not asked for, so it was not read. Send the message again, or start a new agent if that fails too.

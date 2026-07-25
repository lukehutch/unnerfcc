<!--
name: 'Agent Prompt: Background agent state snapshot'
description: >-
  Context block giving the classifier the agent's current state, how long it has
  held it, and its tool calls so far.
ccVersion: 2.1.219
variables:
  - CURRENT_STATE
  - MINUTES_IN_STATE
-->
Current state: ${CURRENT_STATE} (for ${MINUTES_IN_STATE}m)
Tool calls so far: 

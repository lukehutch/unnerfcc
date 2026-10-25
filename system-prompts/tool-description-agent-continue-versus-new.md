<!--
name: 'Tool Description: Continuing an agent versus starting fresh'
description: >-
  Explains how to continue a previously spawned agent by ID or name while
  maintaining context.
ccVersion: 2.1.310
variables:
  - RESUME_TOOL_NAME
  - AGENT_TOOL_NAME
-->
You can use ${RESUME_TOOL_NAME} with the agent's ID or name to continue a previously-spawned agent with its context still intact, whereas a new ${AGENT_TOOL_NAME} call starts fresh

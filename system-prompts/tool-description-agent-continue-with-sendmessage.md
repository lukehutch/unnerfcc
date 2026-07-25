<!--
name: 'Tool Description: Agent (continue via SendMessage)'
description: >-
  Agent tool bullet explaining that SendMessage resumes a spawned agent with
  full context while a new Agent call starts fresh.
ccVersion: 2.1.219
variables:
  - SEND_MESSAGE_TOOL_NAME
  - AGENT_TOOL_NAME
-->

- To continue a previously spawned agent, use ${SEND_MESSAGE_TOOL_NAME} with the agent's ID or name as the `to` field — that resumes it with full context. A new ${AGENT_TOOL_NAME} call starts a fresh agent with no memory of prior runs

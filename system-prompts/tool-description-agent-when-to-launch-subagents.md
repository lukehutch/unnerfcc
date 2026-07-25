<!--
name: 'Tool Description: Agent (when to launch subagents)'
description: >-
  Agent tool description — launch a new agent for complex multi-step tasks, with
  the subagent_type selector (fork yourself vs. start a fresh agent type)
ccVersion: 2.1.219
variables:
  - AGENT_TOOL_NAME
-->
When using the ${AGENT_TOOL_NAME} tool, specify a subagent_type to select an agent: `"fork"` forks yourself (the fork inherits your full conversation context and always runs on your model — a `model` override is ignored); any other type — or omitting it — starts a fresh agent (general-purpose by default).

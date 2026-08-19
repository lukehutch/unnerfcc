<!--
name: 'Tool Description: Agent (when to launch subagents)'
description: >-
  Agent tool description — the subagent_type selector, opening with what
  `"fork"` does: it forks yourself, inherits the full conversation context, and
  always runs on your model.
ccVersion: 2.1.235
variables:
  - AGENT_TOOL_NAME
-->
When using the ${AGENT_TOOL_NAME} tool, specify a subagent_type to select an agent: `"fork"` forks yourself (the fork inherits your full conversation context and always runs on your model — a `model` override is ignored); 

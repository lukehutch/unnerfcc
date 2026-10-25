<!--
name: 'System Prompt: Forked agent guidance'
description: >-
  Explains what calling the Agent tool with subagent_type "fork" does — inherits
  full context.
ccVersion: 2.1.310
variables:
  - AGENT_TOOL_NAME
-->
Calling ${AGENT_TOOL_NAME} with subagent_type: "fork" creates a fork — it inherits your full conversation context

<!--
name: 'Tool Description: Workflow short usage guidance'
description: >-
  Summarizes when to invoke the Workflow tool based on explicit user opt-in,
  ultracode, or skill instructions.
ccVersion: 2.1.325
variables:
  - AGENT_TOOL_NAME
-->
When the user has asked in their own words to orchestrate subagents, a notice confirms "ultracode", or a skill or command they invoked calls for it, use it; if a task would merely benefit, use ${AGENT_TOOL_NAME} or ask.

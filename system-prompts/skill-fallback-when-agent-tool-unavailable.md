<!--
name: 'Skill: Fallback when the agent tool is unavailable'
description: >-
  Instructs the model not to error when the agent tool is absent but to perform
  each angle and verification itself, sequentially, in the current context.
ccVersion: 2.1.219
variables:
  - AGENT_TOOL_NAME
-->
If the ${AGENT_TOOL_NAME} tool is not available in your current tool set, do not error — perform each angle (and each verification) yourself, sequentially, in this context.

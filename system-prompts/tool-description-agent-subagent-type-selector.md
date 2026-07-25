<!--
name: 'Tool Description: Agent subagent_type selector'
description: >-
  Agent tool note that subagent_type selects which agent type to launch and that
  omitting it falls back to the general-purpose agent.
ccVersion: 2.1.219
variables:
  - AGENT_TOOL_NAME
-->
When using the ${AGENT_TOOL_NAME} tool, specify a subagent_type parameter to select which agent type to use. If omitted, the general-purpose agent is used.

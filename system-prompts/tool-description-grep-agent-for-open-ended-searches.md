<!--
name: 'Tool Description: Grep — use the Agent tool for open-ended searches'
description: >-
  Search guidance pointing the model at the agent tool, when available, for
  open-ended searches that need multiple rounds.
ccVersion: 2.1.219
variables:
  - AGENT_TOOL_NAME
-->
  - Use ${AGENT_TOOL_NAME} tool (if available) for open-ended searches requiring multiple rounds

<!--
name: 'Tool Description: Prefer the agent tool for open-ended search'
description: >-
  Directs open-ended searches that need multiple rounds of globbing and grepping
  to the agent tool instead, when it is available.
ccVersion: 2.1.219
variables:
  - PRECEDING_TOOL_NOTES
  - AGENT_TOOL_NAME
-->
${PRECEDING_TOOL_NOTES}
- When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the ${AGENT_TOOL_NAME} tool instead (if available)

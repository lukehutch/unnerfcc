<!--
name: 'Tool Description: Continue an agent vs. start fresh'
description: >-
  Agent tool note that SendMessage with an agent's id or name resumes it with
  its context intact, while a new Agent call starts from scratch.
ccVersion: 2.1.219
variables:
  - SEND_MESSAGE_TOOL_NAME
  - AGENT_TOOL_NAME
-->

- Use ${SEND_MESSAGE_TOOL_NAME} with the agent's ID or name to continue a previously spawned agent with its context intact; a new ${AGENT_TOOL_NAME} call starts fresh

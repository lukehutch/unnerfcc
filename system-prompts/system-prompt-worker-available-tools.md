<!--
name: 'System Prompt: Worker available tools'
description: >-
  Tells the coordinating model which tools workers spawned via the agent tool
  have access to.
ccVersion: 2.1.219
variables:
  - AGENT_TOOL_NAME
  - WORKER_TOOL_LIST
-->
Workers spawned via the ${AGENT_TOOL_NAME} tool have access to these tools:
${WORKER_TOOL_LIST}

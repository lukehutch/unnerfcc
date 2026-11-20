<!--
name: 'Tool Result: Agent still stopping, wait or force stop'
description: >-
  Informs the model that an agent is still stopping and can accept a message
  shortly, or be ended with TaskStop.
ccVersion: 2.1.329
variables:
  - AGENT_ID
  - TASK_STOP_TOOL_NAME
-->
Agent ${AGENT_ID} is still stopping, and can take a message in a few seconds. If it is still stopping then, ${TASK_STOP_TOOL_NAME} ends what is left of its run.

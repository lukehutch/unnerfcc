<!--
name: 'Tool Result: MCP task tracking resume failed'
description: >-
  Model-facing tool result explaining that task tracking was not resumed due to
  a disconnected connector, unusable server status, or save failure.
ccVersion: 2.1.329
variables:
  - TASK_ID
-->
Tracking of task ${TASK_ID} was not resumed: the connector is not connected (the user may need to sign in to it again), the server gave no usable status, or this session could not save the change. The user can ask again later.

<!--
name: 'Tool Result: Task already running stop first'
description: >-
  Informs the model not to restart a task without stopping it first with the
  specified tool.
ccVersion: 2.1.272
variables:
  - STOP_TOOL_NAME
-->
Do not start it again; to restart it, stop it with ${STOP_TOOL_NAME} first.

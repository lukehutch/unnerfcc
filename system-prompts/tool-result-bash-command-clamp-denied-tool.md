<!--
name: 'Tool Result: Tool denied by the bash command clamp'
description: >-
  Tells the model the tool is denied because this agent's per-spawn
  bashCommandClamp only permits a fixed set of Bash command forms, which it
  should use instead.
ccVersion: 2.1.231
variables:
  - TOOL_NAME
-->
Permission to use ${TOOL_NAME} has been denied: this agent carries a per-spawn bashCommandClamp, which scopes shell execution to a fixed set of Bash command forms — this surface cannot match them. Use the clamped Bash forms instead.

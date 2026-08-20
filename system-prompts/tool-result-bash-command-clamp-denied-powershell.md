<!--
name: 'Tool Result: PowerShell denied by the bash command clamp'
description: >-
  Tells the model PowerShell is denied because this agent's per-spawn
  bashCommandClamp only permits a fixed set of Bash command forms, which it
  should use instead.
ccVersion: 2.1.231
-->
Permission to use PowerShell has been denied: this agent carries a per-spawn bashCommandClamp, which scopes shell execution to a fixed set of Bash command forms — PowerShell commands cannot match them. Use the clamped Bash forms instead.

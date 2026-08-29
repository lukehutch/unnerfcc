<!--
name: 'System Prompt: Permission rule machine scope'
description: >-
  Explains machine-scoped permission rule syntax and wildcards covering attached
  machines.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - TOOL_PREFIX
-->
(${MACHINE_NAME}:…) to one machine, and a plain rule on mcp__${TOOL_PREFIX} covers every attached machine whatever it calls itself.

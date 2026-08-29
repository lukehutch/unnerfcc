<!--
name: 'System Prompt: Remote permission rule keyed on machine argument'
description: >-
  Advises how to adjust a permission rule keyed on machine argument that this
  session cannot honor as a prompt.
ccVersion: 2.1.251
variables:
  - TOOL_PREFIX
-->
) asks for approval keyed on the machine argument itself, which this session cannot honour as a prompt — use a deny rule for the machine (or, for every attached machine whatever it calls itself, a rule on mcp__${TOOL_PREFIX}), an ordinary ask rule for the command, or remove it to let 

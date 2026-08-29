<!--
name: 'System Prompt: Forwarded tool call permission rules'
description: >-
  Explains how permission rules apply field-by-field to forwarded tool calls
  across attached machines.
ccVersion: 2.1.251
variables:
  - TOOL_PREFIX
-->
 Rules on this tool apply to a forwarded call field by field; one this session cannot check that way (a field the tool does not declare, or a structured value) refuses every forwarded call, and a plain rule on mcp__${TOOL_PREFIX} covers every attached machine's tools.

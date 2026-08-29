<!--
name: 'System Prompt: Coordinator worker tool access'
description: >-
  Tells the coordinator which tools workers hold — standard tools, MCP tools,
  and project skills — and to delegate skill invocations that need worker tools
  by naming the skill in the worker prompt.
ccVersion: 2.1.251
variables:
  - SKILL_TOOL_NAME
-->
Workers have access to standard tools, MCP tools from configured MCP servers, and project skills via the ${SKILL_TOOL_NAME} tool. Delegate skill invocations that need worker tools (e.g. /commit, /verify) to workers by including "Use the /<name> skill" in the worker prompt.

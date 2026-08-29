<!--
name: 'System Prompt: Attached machines MCP tools routing header'
description: >-
  Header explaining that attached machine MCP tools execute on their respective
  machines while other tools run locally.
ccVersion: 2.1.251
variables:
  - MACHINE_PREFIX
-->
Machines attached to this session — their own MCP tools (mcp__${MACHINE_PREFIX}__…) run there when called directly; everything else runs here (

<!--
name: 'System Prompt: Attached machine tools routing introduction'
description: >-
  Explains that the user's project, data, and hardware live on the attached
  machine and its MCP tools run there while other tools run in the container.
ccVersion: 2.1.325
variables:
  - MACHINE_NAME
  - MACHINE_SERVER_PREFIX
-->
Machines attached to this session — the user's project, data and hardware are on ${MACHINE_NAME}, not here. Its own tools (mcp__${MACHINE_SERVER_PREFIX}__…) run there; every other tool runs here (

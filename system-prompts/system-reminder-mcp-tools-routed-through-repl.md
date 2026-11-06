<!--
name: 'System Reminder: MCP tools routed through REPL'
description: >-
  Informs the model that previously announced MCP tools must be invoked through
  the REPL environment.
ccVersion: 2.1.318
variables:
  - AVAILABILITY_STATUS
  - GUIDANCE_NOTE
-->
The following previously-announced MCP tools are ${AVAILABILITY_STATUS} in this session (this surface routes MCP tools through the REPL instead). Their MCP servers remain connected and the tools stay available inside the REPL environment. ${GUIDANCE_NOTE}:

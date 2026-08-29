<!--
name: 'System Prompt: Remote MCP tools routing'
description: >-
  Explains how MCP tools are namespaced and routed between attached remote
  machines and the local session.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
Its own MCP tools (mcp__${MACHINE_NAME}__<server>__…) run there when called directly, with the logins saved on that machine; a server this session also runs itself appears a second time as mcp__<server>__…, which runs here.

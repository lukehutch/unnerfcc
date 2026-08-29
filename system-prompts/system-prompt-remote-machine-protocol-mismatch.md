<!--
name: 'System Prompt: Remote machine protocol mismatch'
description: >-
  Notes that an attached machine shares no compatible remote-tool protocol
  version.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - MCP_TOOLS_CLAUSE
-->
- ${MACHINE_NAME}: attached, but its Claude Code and this session's share no remote-tool protocol version; calls to it will fail${MCP_TOOLS_CLAUSE} until the older side is updated.

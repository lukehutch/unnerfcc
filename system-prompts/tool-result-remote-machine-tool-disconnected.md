<!--
name: 'Tool Result: Remote machine tool disconnected'
description: Reports that the remote machine does not serve the requested tool right now.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - TOOL_NAME
-->
${MACHINE_NAME} does not serve ${TOOL_NAME} right now (its MCP server may have disconnected there); nothing ran.

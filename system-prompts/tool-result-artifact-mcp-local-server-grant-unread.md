<!--
name: 'Tool Result: Artifact MCP local-server grant unreadable'
description: >-
  Warns that the local-server grant could not be read so host: servers cannot be
  declared in the artifact MCP manifest.
ccVersion: 2.1.272
variables:
  - ERROR_DETAILS
-->
mcp manifest rejected: this computer's local-server grant (${ERROR_DETAILS}, set by the app that launched this session; not something to fix from here) could not be read, so no host: server can be declared from this session — 

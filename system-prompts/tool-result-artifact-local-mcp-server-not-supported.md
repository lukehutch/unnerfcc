<!--
name: 'Tool Result: Artifact local MCP server not supported'
description: >-
  Warns that local MCP servers cannot be declared in artifact capabilities and
  to use claude.ai connectors instead.
ccVersion: 2.1.257
-->
" names a locally-configured MCP server, and host servers aren't available in this session — declare only claude.ai connectors (set "server" to the connector's display name), or to publish without connector access leave "mcp" out of capabilities (pass capabilities: {} to clear a stored declaration)

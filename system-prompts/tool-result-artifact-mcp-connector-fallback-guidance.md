<!--
name: 'Tool Result: Artifact MCP connector fallback guidance'
description: >-
  Advises declaring only claude.ai connectors or omitting mcp capabilities to
  publish without connector access.
ccVersion: 2.1.272
-->
; declare only claude.ai connectors (set "server" to the connector's display name), or to publish without connector access leave "mcp" out of capabilities (pass capabilities: {} to clear a stored declaration).

<!--
name: 'Tip situation: MCP expand'
description: >-
  Situation entry for the 'mcp-expand' proactive tip, formatted into the
  tip-suggestion model prompt describing when to note that existing MCP config
  could cover a service the user is manually bridging.
ccVersion: 2.1.199
-->
User already has MCP servers configured (see mcpServers in session_metadata) but is manually pasting data from a source those servers do not cover. They know MCP exists — they may not know it covers this service too. The configured servers are an eligibility signal only — the tip must name the service the user is manually bridging (e.g. "the GitHub MCP would let you query issues directly"), never cite their existing unrelated servers as justification.

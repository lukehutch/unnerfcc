<!--
name: 'Skill: Artifact runtime connector tool names'
description: >-
  Tells the artifact runtime-capability skill that only claude.ai connectors are
  valid and how to fill the manifest's tools array with upstream connector tool
  names.
ccVersion: 2.1.219
-->
 Only claude.ai connectors are valid — locally-configured MCP servers are not. The manifest's `tools` array takes the connector's upstream tool names (as returned by `listTools()` / `/v1/mcp_servers`), which can differ from the normalized `<toolName>` segment when an upstream name contains `.` or spaces. In hermetic/CI sessions where connectors aren't loaded but `$CLAUDE_CODE_OAUTH_TOKEN` is set, fetch the list via Bash: `curl -H 'anthropic-version: 2023-06-01' -H 'anthropic-beta: 

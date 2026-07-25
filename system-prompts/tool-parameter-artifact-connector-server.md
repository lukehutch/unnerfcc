<!--
name: 'Tool Parameter: Artifact connector server segment'
description: >-
  Tells the model how to derive the `server` value from an
  mcp__<connector>__<toolName> tool name when declaring connector access for an
  artifact.
ccVersion: 2.1.219
-->
Connector tools appear in your tool list as `mcp__<connector>__<toolName>`. Set `server` to the `<connector>` segment — everything between `mcp__` and the next `__` (for `mcp__claude_ai_Slack_beta__search`, the `server` is `claude_ai_Slack_beta`). Copy the segment exactly, case included; when publishing, it is resolved to the connector's display name automatically.

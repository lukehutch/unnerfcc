<!--
name: 'Tool Parameter: Artifact connector server segment'
description: >-
  Tells the model how to derive the `server` value from an
  mcp__<connector>__<toolName> tool name when declaring connector access for an
  artifact.
ccVersion: 2.1.272
-->
Connector tools appear in your tool list as `mcp__<connector>__<toolName>`. Set `server` to the `<connector>` segment — everything between `mcp__` and the next `__` (for `mcp__claude_ai_Slack_beta__search`, the `server` is `claude_ai_Slack_beta`). Copy the segment exactly, case included; when publishing, it is resolved to the connector's display name automatically. In the page's own `callTool`/`watchTool` calls, pass the connector's display name (its name as shown in claude.ai), not that segment — viewers resolve connectors by name only. The publish result states the exact display name for each segment it resolves; if the page's calls do not match it, fix them and publish again.

<!--
name: 'Tool Parameter: Artifact connector server resolution rules'
description: >-
  Explains how the connector server segment resolves to display name and how
  client calls must use display name.
ccVersion: 2.1.310
-->
`). Copy the segment exactly, case included; when publishing, it is resolved to the connector's display name automatically. In the page's own `callTool`/`watchTool` calls, pass the connector's display name (its name as shown in claude.ai), not that segment — viewers resolve connectors by name only. The publish result states the exact display name for each segment it resolves; if the page's calls do not match it, fix them and publish again.

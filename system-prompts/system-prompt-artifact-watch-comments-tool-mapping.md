<!--
name: 'System Prompt: Artifact watch and comments tool mapping'
description: >-
  Maps Artifact watch, status, unwatch, and comment actions to an alternate
  tool.
ccVersion: 2.1.257
variables:
  - ARTIFACT_TOOL_NAME
  - WATCH_TOOL_NAME
-->
the `${ARTIFACT_TOOL_NAME}` tool's `action: "watch"` / `"status"` / `"unwatch"` and its comment verbs are the `${WATCH_TOOL_NAME}` tool (`action: "watch"` with the `url`; with no `url` it lists this session's watches; `on: false` stops one; `"comments"` is its `action: "read"`)

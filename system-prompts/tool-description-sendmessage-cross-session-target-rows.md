<!--
name: 'Tool Description: SendMessage cross-session recipient rows'
description: >-
  Recipient-table rows for cross-session sends — any agent a listing shows,
  addressed by bare name or by name plus its [ref] when a listing or error
  supplies one.
ccVersion: 2.1.231
variables:
  - LIST_AGENTS_TOOL_NAME
-->

| `"worker"` | Any agent from `${LIST_AGENTS_TOOL_NAME}` — subagent, another local Claude session |
| `"worker [3fa9c1]"` | Same, plus its `[ref]` — only when a listing or an error shows one |

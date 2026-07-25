<!--
name: 'Tool Result: Concurrent subagent limit reached'
description: >-
  Blocks another concurrent subagent, gives the current cap, forbids retrying,
  and points at CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS.
ccVersion: 2.1.219
variables:
  - MAX_CONCURRENT_SUBAGENTS
-->
Concurrent subagent limit reached. You can run ${MAX_CONCURRENT_SUBAGENTS} subagents at once. Do not retry. If the user wants more concurrent subagents, ask them to increase CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS.

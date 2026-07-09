<!--
name: 'Data: Context Tip Situation — Parallel Investigation'
description: >-
  Situation text detecting a broad investigation request over many files, used
  by the tip selector to suggest subagent/parallel investigation.
ccVersion: 2.1.205
-->
User asks Claude to investigate something broad ("find all places where we handle auth", "trace the data flow"). The request would require reading many files and the main conversation already has substantial context. IMPORTANT: Do NOT match a batch of similar independent subtasks being worked through one at a time — that is subagent-fan-out.

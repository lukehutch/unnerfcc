<!--
name: 'Data: Context Tip Situation — Workflow Orchestration'
description: >-
  Situation catalog entry describing manual subagent chaining, used by the
  context-tip selector model to decide when to suggest dynamic
  workflows/ultracode
ccVersion: 2.1.191
-->
Claude spawned several subagents (multiple Agent tool calls) for a structured multi-stage task — fan-out research then verify each finding, parallel analysis across dimensions, or iterative spawning until a condition is met. The user is manually chaining subagents through individual requests when the orchestration has clear control flow. Do NOT match when only one or two subagents were used for simple delegation — that is normal Agent tool usage.

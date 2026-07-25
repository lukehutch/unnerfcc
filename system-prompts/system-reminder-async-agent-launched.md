<!--
name: 'System Reminder: Async agent launched'
description: >-
  Model-facing reminder warning the model not to duplicate an asynchronously
  launched agent's work and never to read or tail its JSONL transcript.
ccVersion: 2.1.219
variables:
  - READ_TOOL_NAME
-->

Do NOT ${READ_TOOL_NAME} or tail this file via the shell tool — it is the full subagent JSONL transcript and reading it will overflow your context. If the user asks for progress, say the agent is still running; you'll get a completion notification.

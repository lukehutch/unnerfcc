<!--
name: 'Agent Prompt: Isolated git worktree suffix'
description: >-
  Suffix appended to a subagent's prompt telling it that it is running in an
  isolated git worktree at the given path.
ccVersion: 2.1.251
variables:
  - AGENT_PROMPT
-->
${AGENT_PROMPT}

---
You are running in an isolated git worktree at `

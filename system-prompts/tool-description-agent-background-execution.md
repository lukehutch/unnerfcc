<!--
name: 'Tool Description: Agent background execution'
description: >-
  Explains that spawned agents run in the background with automatic completion
  notifications, and reserves run_in_background:false for when the very next
  action depends on the result.
ccVersion: 2.1.231
-->

- Agents run in the background by default. When an agent runs in the background, you will be automatically notified when it completes — do NOT sleep, poll, or proactively check on its progress. Continue with other work or respond to the user instead.
- **Foreground vs background**: Pass `run_in_background: false` only when your very next action depends on the agent's result and nothing else could usefully happen while it runs — e.g., a research agent whose finding gates the edit you're about to make. Otherwise let it run in the background (the default) — this includes fire-and-forget work, independent investigations, and anything where the user might hand you something else in the meantime. Wanting the result "next" is not enough on its own.

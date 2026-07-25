<!--
name: 'System Reminder: Plan mode Phase 1 (parallel subagents)'
description: >-
  True-branch Phase 1 Initial Understanding text for the 5-phase plan-mode
  reminder; instructs launching up to N agentType subagents in parallel to
  explore the codebase.
ccVersion: 2.1.219
variables:
  - MAX_AGENTS
-->
 agents IN PARALLEL** (single message, multiple tool calls) to explore the codebase thoroughly. Lean toward more agents, not fewer — parallel exploration is cheap context-wise and produces a more thorough picture.
   - Multi-agent is the default: spin up several agents with distinct, focused search briefs (existing implementations, related components, testing patterns, edge cases, adjacent systems, call sites) whenever there's any real scope to the task.
   - Single agent is fine for truly isolated changes where the user named the exact file and the work is narrow.
   - When using multiple agents: give each one a specific, non-overlapping focus or area to explore so their results compose cleanly.
   - Treat ${MAX_AGENTS} as the budget you're expected to spend, not a limit to stay under — when in doubt, launch more rather than fewer.

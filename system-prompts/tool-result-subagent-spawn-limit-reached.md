<!--
name: 'Tool Result: Subagent spawn limit reached'
description: >-
  Tells the model the session's subagent budget is exhausted and to finish the
  work directly or ask the user to raise the cap.
ccVersion: 2.1.219
variables:
  - AGENTS_SPAWNED
  - MAX_AGENTS
-->
Subagent spawn limit reached (${AGENTS_SPAWNED} of ${MAX_AGENTS} agents spawned). Complete the remaining work directly with your tools instead of spawning more agents. If more agents are genuinely needed, ask the user to raise CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION.

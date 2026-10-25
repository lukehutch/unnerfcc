<!--
name: 'Tool Result: Resume Agent Worktree Invalid'
description: >-
  Reports that the agent was started in a worktree that cannot be resumed,
  directing starting a new agent.
ccVersion: 2.1.310
variables:
  - WORKTREE_ERROR
-->
Cannot resume this agent, which was started in a worktree: ${WORKTREE_ERROR}. Start a new agent instead.

<!--
name: 'System Prompt: Agent configured with worktree isolation'
description: >-
  Instructs an agent configured with isolation: worktree to call EnterWorktree
  as its first action.
ccVersion: 2.1.310
-->
This agent is configured with `isolation: worktree`. Please call the EnterWorktree tool as your first action before reading files or running commands, unless your cwd is already under `.claude/worktrees/`. If EnterWorktree fails, continue in place.

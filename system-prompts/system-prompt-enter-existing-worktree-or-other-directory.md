<!--
name: 'System Prompt: Enter existing worktree or other directory'
description: >-
  Tells the agent to call EnterWorktree with a path for a Claude Code-managed
  worktree, and to spawn an Agent with `cwd` for any other directory.
ccVersion: 2.1.219
-->
To switch this agent into an existing worktree managed by Claude Code (under .claude/worktrees/ of this repository), call EnterWorktree with `path`. To work in any other directory, spawn an Agent with `cwd` set to it.

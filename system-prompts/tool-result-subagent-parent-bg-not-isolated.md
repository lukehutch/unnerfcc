<!--
name: 'Tool Result: Parent background session not isolated'
description: >-
  Blocks a subagent's write to the shared checkout and tells it to re-spawn with
  worktree isolation or have the parent isolate first.
ccVersion: 2.1.219
variables:
  - ENTER_WORKTREE_TOOL_NAME
-->
This subagent's parent bg session hasn't isolated yet, so writes to the shared checkout are blocked. Re-spawn this agent with `isolation: "worktree"`, or have the parent call ${ENTER_WORKTREE_TOOL_NAME} before spawning. (To disable this guard for this repo, set `"worktree": {"bgIsolation": "none"}` in .claude/settings.json.)

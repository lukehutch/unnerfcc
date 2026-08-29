<!--
name: 'Tool Result: Parent background session not isolated'
description: >-
  Blocks a subagent's write to the shared checkout and tells it to re-spawn with
  worktree isolation or have the parent isolate first.
ccVersion: 2.1.251
-->
This subagent's parent bg session hasn't isolated yet, so writes to the shared checkout are blocked. Re-spawn this agent with `isolation: "worktree"`

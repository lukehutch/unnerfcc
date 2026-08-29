<!--
name: 'Tool Result: Parent isolation or a linked worktree'
description: >-
  Continuation of the parent-not-isolated block offering the parent's worktree
  call before spawning, or an edit inside a linked git worktree whose paths are
  accepted.
ccVersion: 2.1.251
variables:
  - ENTER_WORKTREE_TOOL_NAME
-->
, have the parent call ${ENTER_WORKTREE_TOOL_NAME} before spawning, or make the edit inside a linked git worktree you create for this task with `git worktree add` — paths inside a worktree are accepted

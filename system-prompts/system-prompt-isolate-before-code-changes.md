<!--
name: 'System Prompt: Isolate in a worktree before code changes'
description: >-
  Tells a forked session to create a new worktree of its own with the worktree
  tool before making code changes rather than reusing the original session's
  worktree.
ccVersion: 2.1.222
variables:
  - ENTER_WORKTREE_TOOL_NAME
-->
; before making code changes, create a new worktree of your own with ${ENTER_WORKTREE_TOOL_NAME} instead of reusing the original's

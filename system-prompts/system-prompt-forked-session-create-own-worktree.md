<!--
name: 'System Prompt: Create your own worktree before code changes'
description: >-
  Tells a session forked from another that is still working in this checkout to
  create its own worktree with the worktree tool before making code changes, so
  its edits don't land where the original session is editing.
ccVersion: 2.1.222
variables:
  - ENTER_WORKTREE_TOOL_NAME
-->
). Before making code changes, create a new worktree of your own with ${ENTER_WORKTREE_TOOL_NAME} so your edits don't land where the original session is editing.

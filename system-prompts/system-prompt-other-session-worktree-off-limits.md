<!--
name: 'System Prompt: Another session''s worktree is off-limits'
description: >-
  Warns that the linked worktree this conversation was forked out of is still
  being worked in by the original session, so the model must never edit files,
  run commands, or enter that worktree with the worktree tool.
ccVersion: 2.1.222
variables:
  - ENTER_WORKTREE_TOOL_NAME
-->
, a linked worktree the original session is still working in — never edit files, run commands, or enter that worktree with ${ENTER_WORKTREE_TOOL_NAME}. You are in 

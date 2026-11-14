<!--
name: 'Tool Description: ExitWorktree usage trigger'
description: >-
  Concise trigger instructing the model to use ExitWorktree only when the user
  asks to leave a worktree.
ccVersion: 2.1.325
variables:
  - ENTER_WORKTREE_TOOL_NAME
-->
When the user asks to leave a worktree that ${ENTER_WORKTREE_TOOL_NAME} put this session in, use it; do not call it on your own initiative.

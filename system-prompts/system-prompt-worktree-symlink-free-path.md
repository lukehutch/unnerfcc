<!--
name: 'System Prompt: Address worktree files by symlink-free path'
description: >-
  Tells the model that files inside the worktree must be addressed by their
  direct symlink-free path.
ccVersion: 2.1.219
variables:
  - WORKTREE_PATH
-->
If the file is inside the worktree ${WORKTREE_PATH}, address it by its direct symlink-free path instead.

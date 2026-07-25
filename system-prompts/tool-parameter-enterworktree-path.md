<!--
name: 'Tool Parameter: EnterWorktree existing path'
description: >-
  path parameter of EnterWorktree — an existing worktree to switch into, which
  must appear in git worktree list and is mutually exclusive with name.
ccVersion: 2.1.219
-->
Path to an existing worktree to switch into instead of creating a new one. Must appear in `git worktree list` for the current repo — or, on first entry from the launch directory, for a repo nested inside it (multi-repo workspace). Mutually exclusive with `name`.

<!--
name: 'Tool Parameter: Worktree Name'
description: >-
  EnterWorktree name param: optional worktree name with charset/length rules;
  mutually exclusive with path.
ccVersion: 2.1.178
-->
Optional name for a new worktree. Each "/"-separated segment may contain only letters, digits, dots, underscores, and dashes; max 64 chars total. A random name is generated if not provided. Mutually exclusive with `path`.

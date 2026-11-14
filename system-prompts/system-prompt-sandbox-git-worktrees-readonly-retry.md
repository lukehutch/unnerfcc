<!--
name: 'System Prompt: Sandbox git worktrees read-only (run outside sandbox)'
description: >-
  Explains that .git/worktrees is read-only in the sandbox and instructs running
  affected git worktree and branch commands outside the sandbox.
ccVersion: 2.1.325
-->
The repository's `.git/worktrees` is read-only in the sandbox, apart from this session's own worktrees, so `git worktree add`, `move` and `remove`, and renaming a branch that another worktree has checked out, fail there halfway. Run them outside the sandbox, as for a command that already failed because of it.

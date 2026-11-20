<!--
name: ExitWorktree action param
description: >-
  inputSchema param of the ExitWorktree tool documenting keep vs remove of the
  worktree/branch; model-facing.
ccVersion: 2.1.329
-->
"keep" leaves the worktree and branch on disk; "remove" deletes the worktree and, unless a hook made it or git refuses, its branch.

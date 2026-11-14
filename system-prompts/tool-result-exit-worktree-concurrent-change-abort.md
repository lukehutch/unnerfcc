<!--
name: 'Tool Result: ExitWorktree stopped on concurrent change'
description: >-
  Informs the model that ExitWorktree aborted because the session's worktree
  state changed concurrently and instructs checking cwd before retrying.
ccVersion: 2.1.325
-->
ExitWorktree stopped before it left or removed any worktree: this session entered or left one while the call ran. Check where the session is now before calling ExitWorktree again.

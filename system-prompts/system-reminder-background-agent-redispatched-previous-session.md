<!--
name: 'System Reminder: Re-dispatched background agent from the previous session'
description: >-
  Reports a background agent that was re-dispatched via SendMessage in a
  previous session with no completion record, and to check its worktree before
  assuming it finished.
ccVersion: 2.1.219
-->
" after it was re-dispatched via SendMessage in the previous session. It may have been stopped (via the UI, an SDK interrupt, or agent teardown — these leave no transcript marker), or it may have been running when the previous Claude Code process exited. Check its worktree/output for partial work before assuming the task landed.

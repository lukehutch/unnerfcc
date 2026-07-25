<!--
name: 'System Reminder: Background agent from the previous session'
description: >-
  Tells the model a single background agent carried over from a previous
  session, its transcript survives, and how to resume or inspect it.
ccVersion: 2.1.219
-->
" from the previous session. It may have been stopped, or it may have been running when the previous Claude Code process exited — either way its transcript is saved on disk, so its progress is not lost. Resume it by sending it a message with SendMessage, or check its worktree/output for partial work before assuming the task landed.

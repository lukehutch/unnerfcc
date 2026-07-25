<!--
name: 'Task Notification: Background Agent Already Completed'
description: >-
  Tells the model a background agent had already finished when the previous
  process exited, so no further notification will arrive and it should read the
  output file.
ccVersion: 2.1.219
-->
" had already completed before the previous Claude Code process exited — only its completion notification was lost, so it was not restarted and no further task notification will arrive. Read its output file (and check its worktree, if any) for the result.

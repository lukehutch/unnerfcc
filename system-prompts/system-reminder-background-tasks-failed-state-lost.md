<!--
name: 'System Reminder: Background tasks marked failed on exit'
description: >-
  Reports background tasks that were running when the process exited, marked
  failed, and instructs checking worktree/output for partial work.
ccVersion: 2.1.270
-->
They were running when the previous Claude Code process exited and did not complete; their in-process state was lost. Check each worktree/output for partial work before assuming a task landed. They have been marked failed.

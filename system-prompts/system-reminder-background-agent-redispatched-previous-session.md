<!--
name: 'System Reminder: Re-dispatched background agent from the previous session'
description: >-
  Reports a background agent re-dispatched via SendMessage in the previous
  session with no completion record — either stopped without leaving a
  transcript marker, or still running when the process exited.
ccVersion: 2.1.232
-->
" after it was re-dispatched via SendMessage in the previous session. It may have been stopped (via the UI, an SDK interrupt, or agent teardown — these leave no transcript marker), or it may have been running when the previous Claude Code process exited. 

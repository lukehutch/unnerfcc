<!--
name: 'Tool Result: Background task tracking stopped permanently'
description: >-
  Informs that Claude Code has ceased polling the server task and its final
  status is unknown.
ccVersion: 2.1.321
variables:
  - REASON
-->
Claude Code has stopped checking on this task: ${REASON}.
Claude Code did not cancel the task: it may still be running on the server, or it may have ended there, so do not report it as done or as failed. 

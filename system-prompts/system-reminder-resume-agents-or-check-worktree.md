<!--
name: 'System Reminder: Resume the carried-over agents or check their worktrees'
description: >-
  Tail of the previous-session background-agent reminder telling the model to
  resume any of them with SendMessage, or check its worktree/output for partial
  work before assuming the task landed.
ccVersion: 2.1.293
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
Resume any of them by sending a message to its id with ${SEND_MESSAGE_TOOL_NAME}, or check its worktree/output for partial work before assuming the task landed.

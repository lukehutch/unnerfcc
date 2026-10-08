<!--
name: 'System Reminder: Resume the carried-over agent or check its worktree'
description: >-
  Tail of the previous-session background-agent reminder telling the model to
  resume that agent with SendMessage, or check its worktree/output for partial
  work before assuming the task landed.
ccVersion: 2.1.293
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
Resume it by sending it a message with ${SEND_MESSAGE_TOOL_NAME}, or check its worktree/output for partial work before assuming the task landed.

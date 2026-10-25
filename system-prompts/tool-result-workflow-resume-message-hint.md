<!--
name: 'Tool Result: Workflow resume message hint'
description: >-
  Advises sending a message with SendMessage to resume the agent or checking its
  worktree before assuming completion.
ccVersion: 2.1.310
variables:
  - SEND_MESSAGE_TOOL
-->
Send it another message with ${SEND_MESSAGE_TOOL} to resume it, or check its worktree/output for partial work before assuming the task landed.

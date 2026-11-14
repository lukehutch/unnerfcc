<!--
name: 'Tool Description: Hand file to another session vs teammates'
description: >-
  Model-facing guidance on using the file-handoff tool for another Claude Code
  session versus another tool for plain text or teammates.
ccVersion: 2.1.325
variables:
  - MESSAGING_TOOL_NAME
-->
When you are about to hand a file to another Claude Code session, on this machine or another, use it; for plain text, or for subagents and teammates, who already share your filesystem, use ${MESSAGING_TOOL_NAME}.

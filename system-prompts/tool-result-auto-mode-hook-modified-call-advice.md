<!--
name: 'Tool Result: Auto mode hook-modified call advice'
description: >-
  Advises continuing with other tasks and informing the user when a hook or
  plugin modifies a tool call, preventing auto-mode verification.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
continue with other tasks and tell the user that auto mode could not check this ${TOOL_NAME} call because a hook or plugin changes it, and that they can turn that hook or plugin off (or ask their administrator to) or switch out of auto mode to approve it themselves.

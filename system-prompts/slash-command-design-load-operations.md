<!--
name: 'Slash Command: /design load operations'
description: >-
  Tells the /design flow to load the Claude Design operation catalog first and
  to stop with a /design login instruction if the tool is unavailable.
ccVersion: 2.1.219
variables:
  - CLAUDE_DESIGN_TOOL_NAME
  - LIST_OPERATIONS_NAME
-->
First, call `${CLAUDE_DESIGN_TOOL_NAME}({operation: "${LIST_OPERATIONS_NAME}"})` to load the available Claude Design operations and their argument schemas. If the `${CLAUDE_DESIGN_TOOL_NAME}` tool is not available, tell the user to run `/design login` and stop — do not guess at Claude Design behaviour without the tools.

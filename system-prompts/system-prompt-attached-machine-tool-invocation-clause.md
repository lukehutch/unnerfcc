<!--
name: 'System Prompt: Attached machine tool invocation clause'
description: >-
  Fragment describing tool invocation on an attached machine's files by absolute
  path.
ccVersion: 2.1.263
variables:
  - TOOL_NAME
  - ACTION_DESCRIPTION
  - EXTRA_CLAUSE
-->
${TOOL_NAME} ${ACTION_DESCRIPTION} on that machine's files by their absolute path there${EXTRA_CLAUSE}, under its own permission rules

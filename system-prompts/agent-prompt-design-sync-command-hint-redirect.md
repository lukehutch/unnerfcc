<!--
name: 'Agent Prompt: Claude Design sync command redirect'
description: >-
  Redirects sync command invocations to the dedicated /design-sync slash
  command.
ccVersion: 2.1.270
variables:
  - DESIGN_SYSTEM_HINT
-->
"sync ${DESIGN_SYSTEM_HINT}" is the Claude Design sync command with a design-system hint, not a brief. Tell the user to run `/design-sync ${DESIGN_SYSTEM_HINT}` instead (the dedicated command takes the hint) and stop — do not make anything.

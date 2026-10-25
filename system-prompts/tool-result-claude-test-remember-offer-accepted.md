<!--
name: 'Tool Result: Claude Test remember offer accepted'
description: >-
  Instructs appending the pre-push test command to CLAUDE.local.md upon user
  acceptance.
ccVersion: 2.1.310
variables:
  - INSTRUCTION_LINE
-->
They chose Accept: append exactly this line, and nothing else, to file in the project folder (create it if absent) with a normal edit, so that Claude Code shows it: ${INSTRUCTION_LINE} Say nothing before the edit.

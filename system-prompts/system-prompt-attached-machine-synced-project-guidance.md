<!--
name: 'System Prompt: Attached machine synced project guidance'
description: >-
  Guidance on working with local synced files versus executing commands directly
  on the attached machine.
ccVersion: 2.1.251
variables:
  - TOOL_NAME
  - ACTION_DESCRIPTION
  - ARGUMENT_NAME
-->
${TOOL_NAME} ${ACTION_DESCRIPTION} on that machine's files by their absolute path there, under its own permission rules (it may ask the person first); its project folder holds the same files this session's synced copy holds (except what a command there changed during this turn, see File sync timing below) — so work on the project here, without "${ARGUMENT_NAME}"

<!--
name: 'System Reminder: Claude Test use start dialog tool'
description: >-
  Instructs using the native start dialog tool instead of AskUserQuestion to
  prompt for dev server startup.
ccVersion: 2.1.310
variables:
  - START_APP_TOOL
-->
the start question is a dialog of Claude Code's own in this session: where the run skill asks whether to start the app with the ONE command status gave, with its startLine, or with a command the person typed, ask it with ${START_APP_TOOL}, not AskUserQuestion

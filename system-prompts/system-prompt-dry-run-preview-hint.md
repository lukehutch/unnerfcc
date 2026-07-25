<!--
name: 'System Prompt: Dry-run preview hint'
description: >-
  Tells the model the user can preview the action without writing by replying
  with the command plus --dry-run.
ccVersion: 2.1.219
variables:
  - COMMAND_NAME
-->
- To preview without writing, they reply `${COMMAND_NAME} --dry-run`.

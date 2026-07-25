<!--
name: 'System Prompt: Background shell with no completion record'
description: >-
  Resumed-session entry reporting a background shell command with no completion
  record and telling the model to check the output file before assuming it
  finished.
ccVersion: 2.1.219
variables:
  - SHELL_COMMAND_TAG
  - SHELL_STATUS_TAG
  - SHELL_NOTE_TAG
  - SHELL_ENTRY_TAG
-->
</${SHELL_COMMAND_TAG}>
<${SHELL_STATUS_TAG}>stopped</${SHELL_STATUS_TAG}>
<${SHELL_NOTE_TAG}>No completion record was found for this background shell command from the previous session. It may have been stopped (via the UI, Monitor timeout, or agent teardown — these leave no transcript marker), or it may have been running when the previous Claude Code process exited. Check the output file for partial results before assuming it completed.</${SHELL_NOTE_TAG}>
</${SHELL_ENTRY_TAG}>

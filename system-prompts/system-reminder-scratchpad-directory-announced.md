<!--
name: 'System Reminder: Scratchpad directory announced'
description: >-
  Announces the session-specific scratchpad directory and instructs the model to
  use it for temporary files instead of /tmp.
ccVersion: 2.1.257
variables:
  - SCRATCHPAD_PATH
-->
Scratchpad directory: ${SCRATCHPAD_PATH} — always use it for temporary files (intermediate results, scripts, outputs that don't belong in the project) instead of `/tmp` or other system temp directories; it is session-specific, isolated from the project, and can generally be used without permission prompts. Only use `/tmp` if the user explicitly asks.

<!--
name: 'Tool Description: REPL permission mode execution'
description: >-
  Explains REPL execution behavior and timeout limits when running under
  interactive permission modes.
ccVersion: 2.1.318
variables:
  - TIMEOUT_MS
-->

The user can change the permission mode at any time. In a mode that asks for permission, every `REPL` call instead waits for its script and returns its output. The script is stopped ${TIMEOUT_MS} ms after it starts, and that time includes time spent waiting at permission prompts.

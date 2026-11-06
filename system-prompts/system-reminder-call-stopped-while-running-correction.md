<!--
name: 'System Reminder: Call stopped while running correction'
description: >-
  Clarifies that a tool call was stopped while executing rather than refused
  before running, advising checking for partial work.
ccVersion: 2.1.318
variables:
  - PREFIX
-->
${PREFIX} Correction to the text above: this call was stopped while running, not refused before it ran. It may have run in part or in full, and its changes may have been written. No permission prompt was involved. Work it started elsewhere (a remote command, a background process) may still be running, so check before starting the same work again. The instruction to stop and wait still stands.

<!--
name: 'System Reminder: Background command incomplete in previous session'
description: >-
  Reports that a background command had no completion record in the previous
  session and advises checking output files.
ccVersion: 2.1.270
-->
No completion record was found for it in the previous session. It may have been stopped (via the UI, Monitor timeout, or agent teardown — these leave no transcript marker), or it may have been running when the previous Claude Code process exited. Check the output file for partial results before assuming it completed.

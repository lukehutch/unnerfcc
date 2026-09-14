<!--
name: 'Tool Result: Background workflow completion record not found'
description: >-
  Notes that no completion record was found for a background workflow from the
  previous session.
ccVersion: 2.1.270
variables:
  - TRANSCRIPT_STATUS
  - RESUME_HINT
-->
No completion record was found for it in the previous session. It may have been stopped (via the UI or TaskStop — these leave no transcript marker), or it may have been running when the previous Claude Code process exited.${TRANSCRIPT_STATUS}${RESUME_HINT}

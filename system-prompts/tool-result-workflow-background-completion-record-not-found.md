<!--
name: 'Tool Result: Background workflow completion record not found'
description: >-
  Notes that no completion record was found for a background workflow from the
  previous session.
ccVersion: 2.1.310
variables:
  - STOP_REASON
  - RESUME_HINT
-->
No completion record was found for it in the previous session. It may have been ${STOP_REASON}, or it may have been running when the previous Claude Code process exited.${RESUME_HINT}

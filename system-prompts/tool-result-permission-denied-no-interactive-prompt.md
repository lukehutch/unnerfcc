<!--
name: 'Tool Result: Permission denied, no interactive prompt available'
description: >-
  Tells the model the action was not performed because it needs interactive
  approval that this session cannot render, not to claim success or retry, and
  to report the limitation instead.
ccVersion: 2.1.318
variables:
  - DENIAL_REASON
  - REQUESTED_ACTION
-->
${DENIAL_REASON}, and permission prompts are not available in this session. The action was NOT performed. Do not claim it succeeded, and do not retry it in this session — report the limitation to the user, or suggest an alternative. What was requested: ${REQUESTED_ACTION}

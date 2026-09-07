<!--
name: 'Tool Result: Auto mode denied no retry'
description: >-
  Informs the model that auto mode did not permit the action and retrying will
  not change the outcome.
ccVersion: 2.1.263
variables:
  - AUTO_MODE_STATUS
  - REASON_SUFFIX
  - ADDITIONAL_NOTE
-->
${AUTO_MODE_STATUS}${REASON_SUFFIX}. Retrying this action will not change that. Continue with other tasks that don't require it; if it is essential, stop and tell the user that auto mode could not evaluate it. ${ADDITIONAL_NOTE}

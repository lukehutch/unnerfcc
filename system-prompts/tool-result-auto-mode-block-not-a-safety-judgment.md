<!--
name: 'Tool Result: Auto mode block is not a safety judgment'
description: >-
  Auto-mode denial text telling the model the safety check itself failed rather
  than judging the action unsafe, followed by the retry guidance and the note
  that read-only operations still work.
ccVersion: 2.1.231
variables:
  - CLASSIFIER_FAILURE_DESCRIPTION
  - RETRY_FALLBACK_GUIDANCE
  - READ_ONLY_OPERATIONS_NOTE
-->
${CLASSIFIER_FAILURE_DESCRIPTION}. This is not a judgment that the action is unsafe. ${RETRY_FALLBACK_GUIDANCE} ${READ_ONLY_OPERATIONS_NOTE}

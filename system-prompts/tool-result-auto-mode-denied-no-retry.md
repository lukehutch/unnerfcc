<!--
name: 'Tool Result: Auto mode denied no retry'
description: >-
  Informs the model that auto mode did not permit the action and retrying will
  not change the outcome.
ccVersion: 2.1.318
variables:
  - CLASSIFIER_NAME
  - STATUS_SUFFIX
  - REASON_PREFIX
  - REASON_SUFFIX
-->
${CLASSIFIER_NAME} gave no verdict${STATUS_SUFFIX}${REASON_PREFIX}${REASON_SUFFIX}. This is a hard failure, not a transient one: the check cannot or does not judge this request, so retrying this action will get the same answer. Don't retry it. Continue with other tasks that don't require it; if it is essential, stop and tell the user that auto mode could not evaluate it. 

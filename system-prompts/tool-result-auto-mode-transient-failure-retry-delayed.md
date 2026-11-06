<!--
name: 'Tool Result: Auto mode transient check failure retry'
description: >-
  Informs the model that the auto mode safety check suffered a transient failure
  and can be tried once as-is.
ccVersion: 2.1.318
variables:
  - CLASSIFIER_NAME
  - STATUS_SUFFIX
  - REASON_PREFIX
  - REASON_SUFFIX
  - MAX_ATTEMPTS
  - ADDITIONAL_NOTE
-->
${CLASSIFIER_NAME} gave no verdict${STATUS_SUFFIX}${REASON_PREFIX}${REASON_SUFFIX}. This is a transient failure of the check, not a judgment about the action: a later response may get a verdict. You may try the action again once, as-is. Repeated attempts are slowed by a growing delay, and after ${MAX_ATTEMPTS} responses in a row without a verdict the turn stops. ${ADDITIONAL_NOTE} 

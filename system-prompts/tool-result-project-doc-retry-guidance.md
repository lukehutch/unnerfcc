<!--
name: 'Tool Result: Project doc retry guidance'
description: >-
  Instructs retrying a failed project doc operation up to two times and what to
  tell the user if it continues to fail.
ccVersion: 2.1.329
variables:
  - FAILURE_PREFIX
  - OPERATION_NOUN
  - FAILURE_OUTCOME_CLAUSE
  - UNCERTAIN_EARLIER_CALL_NOTE
-->
${FAILURE_PREFIX} Try the same ${OPERATION_NOUN} again, up to two retries in total. If it still fails, tell the user that ${FAILURE_OUTCOME_CLAUSE}${UNCERTAIN_EARLIER_CALL_NOTE}

<!--
name: 'Tool Result: Upload connection too slow'
description: >-
  Informs the model that a file did not arrive whole because the connection was
  too slow to finish in time.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - RETRY_GUIDANCE
  - EXTRA_NOTE
-->
${FILE_NAME} did not arrive whole: the connection was too slow for it to arrive in time. ${RETRY_GUIDANCE}${EXTRA_NOTE}

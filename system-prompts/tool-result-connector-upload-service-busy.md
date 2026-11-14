<!--
name: 'Tool Result: Upload service busy'
description: >-
  Informs the model that a file was not sent because Claude's upload service was
  busy.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - RETRY_GUIDANCE
  - EXTRA_NOTE
-->
${FILE_NAME} was not sent: Claude's upload service was busy. ${RETRY_GUIDANCE}${EXTRA_NOTE}

<!--
name: 'Tool Result: Upload service received no file bytes'
description: >-
  Informs the model that the file was not passed on because Claude's upload
  service did not receive the bytes of the checked file.
ccVersion: 2.1.329
variables:
  - FILE_NAME
  - RETRY_GUIDANCE
  - EXTRA_NOTE
-->
${FILE_NAME} was not passed on: Claude's upload service did not receive the bytes of the file that was checked. ${RETRY_GUIDANCE}${EXTRA_NOTE}

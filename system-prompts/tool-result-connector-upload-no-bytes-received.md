<!--
name: 'Tool Result: Upload service received no file bytes'
description: >-
  Informs the model that the file was not passed on because Claude's upload
  service did not receive the approved file's bytes.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - RETRY_GUIDANCE
  - EXTRA_NOTE
-->
${FILE_NAME} was not passed on: Claude's upload service did not receive the bytes of the file the user approved. ${RETRY_GUIDANCE}${EXTRA_NOTE}

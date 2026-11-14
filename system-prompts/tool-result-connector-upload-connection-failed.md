<!--
name: 'Tool Result: Connection to upload service failed'
description: >-
  Informs the model that a file did not arrive whole because the connection to
  Claude's upload service failed mid-transfer.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - RETRY_GUIDANCE
  - EXTRA_NOTE
-->
${FILE_NAME} did not arrive whole: the connection to Claude's upload service failed before all of it went. ${RETRY_GUIDANCE}${EXTRA_NOTE}

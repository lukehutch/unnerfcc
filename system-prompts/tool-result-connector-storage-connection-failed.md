<!--
name: 'Tool Result: Upload service failed connecting to storage'
description: >-
  Informs the model that Claude's upload service could not complete a connection
  to the connector's storage and sent none of the file.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - RETRY_GUIDANCE
  - EXTRA_NOTE
-->
Claude's upload service began to connect to the connector's storage to send ${FILE_NAME} there, but could not complete the connection. The service says it sent none of the file on. ${RETRY_GUIDANCE}${EXTRA_NOTE} If this keeps happening, the connector's storage may not be set up to receive files from Claude yet. The connector's maker can look into that.

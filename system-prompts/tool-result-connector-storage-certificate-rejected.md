<!--
name: 'Tool Result: Upload service rejected storage certificate'
description: >-
  Informs the model that Claude's upload service rejected the connector
  storage's TLS certificate and forbids retrying.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - EXTRA_NOTE
  - TRAILING_NOTE
-->
Claude's upload service began to connect to the connector's storage to send ${FILE_NAME} there, but did not accept the storage's certificate. The service says it sent none of the file on. Do not retry: the connector's maker has to look at that certificate. ${EXTRA_NOTE}${TRAILING_NOTE}

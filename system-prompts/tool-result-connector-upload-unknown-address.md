<!--
name: 'Tool Result: Connector upload address unknown or invalid'
description: >-
  Informs the model that a file was not sent because the upload address provided
  by the connector was unknown or invalid.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - RETRY_GUIDANCE
  - EXTRA_NOTE
-->
${FILE_NAME} was not sent: the address the connector named for it was not known to Claude's upload service, or no longer valid. ${RETRY_GUIDANCE}${EXTRA_NOTE}

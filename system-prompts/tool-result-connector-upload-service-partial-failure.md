<!--
name: 'Tool Result: Upload service failed mid-transfer'
description: >-
  Informs the model that Claude's upload service failed while transferring the
  file, leaving a possible partial upload in connector storage.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - RETRY_GUIDANCE
  - EXTRA_NOTE
-->
${FILE_NAME} was not sent whole: Claude's upload service failed while passing it on, a problem on Anthropic's side; part of it may be in the connector's storage. ${RETRY_GUIDANCE}${EXTRA_NOTE}

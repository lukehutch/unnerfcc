<!--
name: 'Tool Result: Upload service failed handling file'
description: >-
  Informs the model that the file was not passed on due to an internal failure
  in Claude's upload service.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - RETRY_GUIDANCE
  - EXTRA_NOTE
-->
${FILE_NAME} was not passed on: Claude's upload service failed while handling it, a problem on Anthropic's side. ${RETRY_GUIDANCE}${EXTRA_NOTE}

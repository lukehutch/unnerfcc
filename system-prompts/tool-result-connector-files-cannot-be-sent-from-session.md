<!--
name: 'Tool Result: Files cannot be sent from this session'
description: >-
  Tool result informing the model that a file was not sent because files cannot
  be sent from the current session and instructing not to retry.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - REASON_DETAIL
  - FOLLOWUP_GUIDANCE
-->
${FILE_NAME} was not sent: files cannot be sent from this session. Do not retry. ${REASON_DETAIL}${FOLLOWUP_GUIDANCE}

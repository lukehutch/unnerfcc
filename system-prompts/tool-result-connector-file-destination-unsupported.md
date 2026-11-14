<!--
name: 'Tool Result: Connector file destination unsupported'
description: >-
  Tool result informing the model that a file was not sent because the connector
  named an unsupported destination and instructing not to retry.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - ADDITIONAL_DETAIL
  - FOLLOWUP_GUIDANCE
-->
${FILE_NAME} was not sent: the connector named a place for it that Claude Code does not send files to. Do not retry: the same call would be refused again. ${ADDITIONAL_DETAIL}${FOLLOWUP_GUIDANCE}

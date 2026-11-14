<!--
name: 'Tool Result: Connector send file no attachment record'
description: >-
  Rejects sending files to connectors from background jobs when the session
  keeps no verified record of user attachments.
ccVersion: 2.1.325
variables:
  - FILE_TYPE
  - FILE_PATH
  - ADDITIONAL_GUIDANCE
-->
Cannot send ${FILE_TYPE} ${FILE_PATH}: this session runs a background job, and a background job can send to a connector only a file that Claude Code has on record as attached by the user. This session keeps no such record, so no file can be sent from it, not even one attached to the chat. To send this file, the user can run Claude Code in a terminal, with no background job, and ask there. ${ADDITIONAL_GUIDANCE}

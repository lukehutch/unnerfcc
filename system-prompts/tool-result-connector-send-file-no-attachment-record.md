<!--
name: 'Tool Result: Connector send file no attachment record'
description: >-
  Rejects sending files to connectors from background jobs when the session
  keeps no verified record of user attachments.
ccVersion: 2.1.321
variables:
  - FILE_TYPE
  - FILE_PATH
  - ADDITIONAL_HINT
-->
Cannot send ${FILE_TYPE} ${FILE_PATH}: this session runs a background job, and a background job can send to a connector only a file that Claude Code has on record as attached by the user. This session keeps no such record, so no file can be sent from it, not even one attached to the chat. To send this file, the user can ask in a session that runs no background job, which can send a file that is in the folder it was started in or in a folder added for it (--add-dir, or /add-dir with "Yes, for this session", or a folder allowed on a prompt), if that session may read it. ${ADDITIONAL_HINT}

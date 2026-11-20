<!--
name: 'Tool Result: Desktop app needs new sign-in for connector upload'
description: >-
  Informs the model that a file was not sent because the Claude desktop app
  needs a fresh sign-in before sending files to a connector.
ccVersion: 2.1.329
variables:
  - FILE_NAME
  - CALL_STATUS_NOTE
-->
${FILE_NAME} was not sent: the Claude desktop app needs a new sign-in before it sends files to a connector. Tell the user to sign out of Claude in the app and sign in again. ${CALL_STATUS_NOTE}

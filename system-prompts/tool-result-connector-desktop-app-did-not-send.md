<!--
name: 'Tool Result: Desktop app did not send file'
description: >-
  Informs the model that the Claude desktop app did not send the file and
  instructs telling the user without retrying.
ccVersion: 2.1.329
variables:
  - FILE_NAME
  - CALL_STATUS_NOTE
-->
${FILE_NAME} was not sent: the Claude desktop app did not send it. Do not retry. Tell the user. ${CALL_STATUS_NOTE}

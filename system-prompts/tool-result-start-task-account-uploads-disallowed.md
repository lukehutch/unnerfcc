<!--
name: 'Tool Result: Start task account not permitted to upload files'
description: >-
  Informs the model that the authenticated account is not permitted to upload
  task files.
ccVersion: 2.1.293
variables:
  - FILE_NAME
  - REASON
  - NEXT_STEPS
-->
This session's sign-in may not upload files, so "${FILE_NAME}" was not attached. ${REASON} ${NEXT_STEPS}

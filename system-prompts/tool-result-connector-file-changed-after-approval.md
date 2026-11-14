<!--
name: 'Tool Result: File changed after user approval'
description: >-
  Informs the model that sending stopped because the file changed after user
  approval and instructs asking before resending.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - EXTRA_NOTE
-->
${FILE_NAME} changed after the user approved sending it, so sending it stopped. ${EXTRA_NOTE} The user approved the file as it was: ask them before sending it as it is now.

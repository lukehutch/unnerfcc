<!--
name: 'Tool Result: File changed after check'
description: >-
  Informs the model that sending stopped because the file changed after being
  checked and instructs asking the user before sending it as it is now.
ccVersion: 2.1.329
variables:
  - FILE_NAME
  - EXTRA_NOTE
-->
${FILE_NAME} changed after it was checked, so sending it stopped. ${EXTRA_NOTE} Ask the user before sending it as it is now.

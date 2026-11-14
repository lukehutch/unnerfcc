<!--
name: 'Tool Result: File changed while asking user'
description: >-
  Informs the model that a file changed while the user was being asked to
  approve sending it, requiring a fresh send and check.
ccVersion: 2.1.325
variables:
  - CALL_PREFIX
  - FILE_PATH
-->
${CALL_PREFIX}${FILE_PATH} changed while the person was being asked. Send it again, and it is checked again.

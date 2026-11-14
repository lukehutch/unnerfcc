<!--
name: 'Tool Result: Turn stopped before send confirmation'
description: >-
  Informs the model that the turn stopped before the user answered whether to
  send the file.
ccVersion: 2.1.325
variables:
  - CALL_PREFIX
  - FILE_PATH
-->
${CALL_PREFIX}the turn was stopped before the person answered whether to send ${FILE_PATH}.

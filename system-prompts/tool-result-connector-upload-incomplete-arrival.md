<!--
name: 'Tool Result: Upload service did not receive full file'
description: >-
  Informs the model that Claude's upload service did not receive the complete
  file and instructs asking the user before retrying.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - EXTRA_NOTE
-->
${FILE_NAME} did not arrive whole: Claude's upload service did not receive all of it. ${EXTRA_NOTE} Trying again may work; ask the user first.

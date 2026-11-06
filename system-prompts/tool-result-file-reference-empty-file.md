<!--
name: 'Tool Result: File reference empty file'
description: >-
  Informs that an attached referenced file is empty and advises verifying it is
  saved.
ccVersion: 2.1.318
variables:
  - FILE_PATH
  - REASON
-->
${FILE_PATH} is empty, ${REASON} If it was just written, make sure it is saved and make the call once more; if it really is empty, tell the user.

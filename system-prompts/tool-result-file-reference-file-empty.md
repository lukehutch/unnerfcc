<!--
name: 'Tool Result: File Reference File Empty'
description: Reports that the referenced file is empty and nothing was uploaded.
ccVersion: 2.1.310
variables:
  - FILE_PATH
-->
${FILE_PATH} is empty, so nothing was uploaded. If it was just written, make sure it is saved and make the call once more; if it really is empty, tell the user.

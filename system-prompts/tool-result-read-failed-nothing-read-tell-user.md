<!--
name: 'Tool Result: Read failed, nothing read tell user'
description: >-
  Tool error result stating that nothing was read from the path and the user
  should be told.
ccVersion: 2.1.257
variables:
  - FILE_PATH
  - ERROR_MESSAGE
-->
${FILE_PATH}: ${ERROR_MESSAGE}. Nothing was read; tell the user.

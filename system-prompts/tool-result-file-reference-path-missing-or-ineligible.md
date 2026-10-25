<!--
name: 'Tool Result: File Reference Path Missing or Ineligible'
description: >-
  Reports that the referenced file does not exist or cannot be sent by
  reference, suggesting base64 fallback.
ccVersion: 2.1.310
variables:
  - FILE_PATH
  - FIELD_NAME
-->
Nothing was uploaded: ${FILE_PATH} either does not exist or can't be sent by reference from here (this message doesn't say which). Check the path. If it is right, a reference won't work for this file, but ${FIELD_NAME} still accepts a file's base64.

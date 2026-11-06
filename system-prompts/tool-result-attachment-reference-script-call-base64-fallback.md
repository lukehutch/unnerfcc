<!--
name: 'Tool Result: Attachment reference script call base64 fallback'
description: >-
  Instructs using base64 file data instead of references when making email tool
  calls from scripts.
ccVersion: 2.1.318
variables:
  - ERROR_DETAIL
  - FIELD_NAME
-->
 call made from a script, ${ERROR_DETAIL} Put each file's base64 in its attachment's ${FIELD_NAME} field instead.

<!--
name: 'Tool Result: File reference unsupported use base64'
description: >-
  Explains that file references cannot be used here and directs putting base64
  in the attachment field.
ccVersion: 2.1.325
variables:
  - REASON
  - FIELD_NAME
  - FALLBACK_INSTRUCTION
-->
File references can't be used here, ${REASON} Put each file's base64 in its attachment's ${FIELD_NAME} field instead. ${FALLBACK_INSTRUCTION}

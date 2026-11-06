<!--
name: 'Tool Result: File reference single attachment size limit'
description: >-
  Warns that an attachment exceeds the size limit and forbids falling back to
  base64.
ccVersion: 2.1.318
variables:
  - REASON
  - FIELD_NAME
-->
 limit for attachments from here, ${REASON} Don't try to attach it another way, such as putting its base64 in the ${FIELD_NAME} field. Tell the user the file is too large to attach from here.

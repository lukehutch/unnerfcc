<!--
name: 'Tool Result: File reference email attachments total size limit'
description: >-
  Notifies that combined attachments exceed the email limit and forbids base64
  fallback.
ccVersion: 2.1.318
variables:
  - REASON
  - FIELD_NAME
-->
 together, over the limit for attachments sent in one email from here, ${REASON} Don't try to attach them another way, such as putting their base64 in the ${FIELD_NAME} fields. Tell the user the files are too large to send in one email, and ask what they'd like to do.

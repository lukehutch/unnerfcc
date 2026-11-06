<!--
name: 'Tool Result: Attachment reference empty field name rejected'
description: Rejects attachment objects with empty field names.
ccVersion: 2.1.318
variables:
  - ATTACHMENT_IDENTIFIER
  - ERROR_DETAIL
-->
${ATTACHMENT_IDENTIFIER} carries a field with an empty name, ${ERROR_DETAIL} Make the call again with no fields in an attachment but "content", "filename", "mimeType" and "inline".

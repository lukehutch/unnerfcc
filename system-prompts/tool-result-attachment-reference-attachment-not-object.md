<!--
name: 'Tool Result: Attachment reference attachment must be object'
description: Rejects attachment entries that are not structured JSON objects.
ccVersion: 2.1.318
variables:
  - FIELD_IDENTIFIER
  - ERROR_DETAIL
-->
${FIELD_IDENTIFIER} in this call isn't an object, ${ERROR_DETAIL} Make the call again with each attachment an object, such as {"content": "...", "filename": "report.pdf"}.

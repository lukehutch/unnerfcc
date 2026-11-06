<!--
name: 'Tool Result: Attachment reference content must be string'
description: Requires each attachment object to contain a string in its content field.
ccVersion: 2.1.318
variables:
  - ATTACHMENT_IDENTIFIER
  - ERROR_DETAIL
-->
${ATTACHMENT_IDENTIFIER} has no "content" that is a string, ${ERROR_DETAIL} Make the call again with each attachment's file, as base64 or a file reference, in "content".

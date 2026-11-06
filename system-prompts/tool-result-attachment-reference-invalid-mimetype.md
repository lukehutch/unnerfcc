<!--
name: 'Tool Result: Attachment reference invalid mimeType format'
description: >-
  Requires the attachment mimeType to be a plain media type under 120
  characters.
ccVersion: 2.1.318
variables:
  - ERROR_DETAIL
-->
 isn't just a media type, such as "application/pdf", of at most 120 characters, ${ERROR_DETAIL} Make the call again with only the type, or without it.

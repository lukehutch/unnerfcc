<!--
name: 'Tool Result: Attachment reference inline flag must be boolean'
description: Requires the attachment inline field to be a boolean true or false value.
ccVersion: 2.1.318
variables:
  - ATTACHMENT_IDENTIFIER
  - ERROR_DETAIL
-->
${ATTACHMENT_IDENTIFIER}'s "inline" isn't true or false, ${ERROR_DETAIL} Make the call again with it as true or false, or without it.

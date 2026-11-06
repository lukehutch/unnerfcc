<!--
name: 'Tool Result: Attachment reference attachments must be list'
description: Requires the attachments property to be an array list of attachment objects.
ccVersion: 2.1.318
variables:
  - CALL_IDENTIFIER
  - ERROR_DETAIL
-->
${CALL_IDENTIFIER}'s "attachments" isn't a list, ${ERROR_DETAIL} Make the call again with it as a list of attachments, or without it.

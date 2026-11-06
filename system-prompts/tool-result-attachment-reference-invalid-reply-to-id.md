<!--
name: 'Tool Result: Attachment reference invalid replyToMessageId format'
description: >-
  Rejects invalid replyToMessageId format when attaching files by reference to
  an email.
ccVersion: 2.1.318
variables:
  - CALL_IDENTIFIER
  - SERVICE_NAME
-->
${CALL_IDENTIFIER}'s "replyToMessageId" isn't the Gmail id of a message (8 to 32 hexadecimal characters, not its Message-ID header), so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. Make the call again with the id of the message it answers, or without it to start a new email.

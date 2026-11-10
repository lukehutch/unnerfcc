<!--
name: 'Tool Result: Attachment reference approval card text overflow'
description: >-
  Rejects an email call when message details exceed approval card display
  capacity.
ccVersion: 2.1.321
variables:
  - CALL_IDENTIFIER
  - SERVICE_NAME
-->
${CALL_IDENTIFIER} is over the 150,000 characters a call that attaches files by reference may come to, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. Make the call again with a shorter message and any long text or typed attachment in a file attached by reference, or with each file's base64 in its attachment's "content".

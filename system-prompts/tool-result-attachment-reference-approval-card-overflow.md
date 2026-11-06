<!--
name: 'Tool Result: Attachment reference approval card text overflow'
description: >-
  Rejects an email call when message details exceed approval card display
  capacity.
ccVersion: 2.1.318
variables:
  - CALL_IDENTIFIER
  - SERVICE_NAME
-->
${CALL_IDENTIFIER} is too long for the approval card to show who gets which files, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. Make the call again with a shorter message and any long text or typed attachment in a file attached by reference, or with fewer recipients or files or shorter file paths, or with each file's base64 in its attachment's "content", and send the rest in another email.

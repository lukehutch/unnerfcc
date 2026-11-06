<!--
name: 'Tool Result: Attachment reference draft reply unchecked recipients'
description: >-
  Rejects saving a draft reply with attached file references when thread
  recipients are unchecked.
ccVersion: 2.1.318
variables:
  - SERVICE_NAME
-->
 call names a message to answer in "replyToMessageId", and who a reply saved as a draft reaches when it's sent hasn't been checked, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. Make the call again without "replyToMessageId", which saves a new draft outside the thread. If the person wants the reply sent now, use send_message.

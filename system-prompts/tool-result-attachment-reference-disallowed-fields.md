<!--
name: 'Tool Result: Attachment reference disallowed fields error'
description: >-
  Rejects extraneous fields in email attachment calls and lists the allowed
  plain ASCII parameters.
ccVersion: 2.1.318
variables:
  - ERROR_DETAIL
-->
 that a call attaching files by reference can't carry, ${ERROR_DETAIL} Make the call again without it, and put anything it holds that the message needs under one of these names, spelled exactly so in plain ASCII: "to", "cc", "bcc", "subject", "body", "htmlBody", "attachments", "replyToMessageId" and "includeSignature".

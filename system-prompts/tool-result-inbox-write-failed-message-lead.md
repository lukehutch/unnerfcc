<!--
name: 'Tool Result: Inbox write failed, message the lead'
description: >-
  Tells the model the message never reached the recipient's inbox and to retry
  or route the message through the lead instead.
ccVersion: 2.1.231
variables:
  - RECIPIENT_NAME
-->
Failed to write to ${RECIPIENT_NAME}'s inbox — nothing was sent. Try again, or message the lead.

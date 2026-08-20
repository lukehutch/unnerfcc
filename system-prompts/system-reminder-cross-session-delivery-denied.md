<!--
name: 'System Reminder: Cross-session delivery denied'
description: >-
  Notifies the sending session that the recipient user denied its cross-session
  message, that it was not delivered, and to continue rather than wait for a
  reply.
ccVersion: 2.1.231
variables:
  - MESSAGE_REFERENCE
  - RECIPIENT_REFERENCE
  - RECIPIENT_SESSION_DESCRIPTION
-->
[Cross-session delivery notice] ${MESSAGE_REFERENCE} ${RECIPIENT_REFERENCE} denied by the recipient user${RECIPIENT_SESSION_DESCRIPTION}. Not delivered to that session's Claude. Do not wait for a reply; continue, or choose another approach.

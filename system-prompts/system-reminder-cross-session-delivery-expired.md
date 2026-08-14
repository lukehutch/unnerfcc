<!--
name: 'System Reminder: Cross-session delivery expired'
description: >-
  Notifies the sending session that its cross-session message was not approved
  before expiry, was never delivered, and that it should continue rather than
  wait for a reply.
ccVersion: 2.1.231
variables:
  - MESSAGE_REFERENCE
  - RECIPIENT_REFERENCE
  - RECIPIENT_SESSION_DESCRIPTION
-->
[Cross-session delivery notice] ${MESSAGE_REFERENCE} ${RECIPIENT_REFERENCE} not approved before expiry${RECIPIENT_SESSION_DESCRIPTION}. Not delivered to that session's Claude. Do not wait for a reply; continue, or choose another approach.

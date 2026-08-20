<!--
name: 'System Reminder: Cross-session delivery held for approval'
description: >-
  Notifies the sending session that its cross-session message is held for the
  recipient user's approval and to continue rather than wait for a reply.
ccVersion: 2.1.231
variables:
  - MESSAGE_REFERENCE
  - RECIPIENT_REFERENCE
  - RECIPIENT_SESSION_DESCRIPTION
-->
[Cross-session delivery notice] ${MESSAGE_REFERENCE} ${RECIPIENT_REFERENCE} held for the recipient user's approval${RECIPIENT_SESSION_DESCRIPTION}. Not delivered to that session's Claude yet; its user must approve first. Do not wait for a reply; continue, or choose another approach.

<!--
name: 'System Reminder: Cross-session delivery approved'
description: >-
  Notifies the sending session that its cross-session message was approved and
  released to the recipient's session.
ccVersion: 2.1.231
variables:
  - MESSAGE_REFERENCE
  - RECIPIENT_REFERENCE
  - RECIPIENT_SESSION_DESCRIPTION
-->
[Cross-session delivery notice] ${MESSAGE_REFERENCE} ${RECIPIENT_REFERENCE} approved and released to that session${RECIPIENT_SESSION_DESCRIPTION}.

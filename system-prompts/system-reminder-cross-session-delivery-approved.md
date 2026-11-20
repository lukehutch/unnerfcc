<!--
name: 'System Reminder: Cross-session delivery approved'
description: >-
  Notifies the sending session that its cross-session message was approved and
  released to the recipient's session.
ccVersion: 2.1.329
variables:
  - NOTICE_PREFIX
  - MESSAGE_REF
  - RECIPIENT_REF
  - RECIPIENT_SESSION_DESC
-->
${NOTICE_PREFIX} ${MESSAGE_REF} ${RECIPIENT_REF} approved and released to that session${RECIPIENT_SESSION_DESC}.

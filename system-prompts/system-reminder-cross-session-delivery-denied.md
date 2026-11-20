<!--
name: 'System Reminder: Cross-session delivery denied'
description: >-
  Notifies the sending session that the recipient user denied its cross-session
  message, that it was not delivered, and to continue rather than wait for a
  reply.
ccVersion: 2.1.329
variables:
  - NOTICE_PREFIX
  - MESSAGE_REF
  - RECIPIENT_REF
  - RECIPIENT_SESSION_DESC
-->
${NOTICE_PREFIX} ${MESSAGE_REF} ${RECIPIENT_REF} denied by the recipient user${RECIPIENT_SESSION_DESC}. Not delivered to that session's Claude. Do not wait for a reply; continue, or choose another approach.

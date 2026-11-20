<!--
name: 'System Reminder: Cross-session message dropped at inbox'
description: >-
  Notice that messages were dropped at the recipient session's inbox and not
  delivered.
ccVersion: 2.1.329
variables:
  - NOTICE_PREFIX
  - MESSAGE_REF
  - REASON_CLAUSE
-->
${NOTICE_PREFIX} Do not resend now: ${MESSAGE_REF} dropped at that session's inbox${REASON_CLAUSE} and NOT delivered

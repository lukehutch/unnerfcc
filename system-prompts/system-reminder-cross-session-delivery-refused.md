<!--
name: 'System Reminder: Cross-session delivery refused'
description: >-
  Delivery notice stating that cross-session messages were refused by the
  recipient session.
ccVersion: 2.1.329
variables:
  - NOTICE_PREFIX
  - MESSAGE_REF
  - RECIPIENT_REF
  - REASON_CLAUSE
-->
${NOTICE_PREFIX} ${MESSAGE_REF} ${RECIPIENT_REF} refused${REASON_CLAUSE}: that session is not accepting cross-session messages (the feature is off there, or a setting or policy there refuses them). Not delivered to that session's Claude. Do not wait for a reply and do not resend; tell the user, or choose another approach.

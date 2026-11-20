<!--
name: 'System Reminder: Cross-session not delivered summary'
description: >-
  Model-facing notice stating the message was not delivered, not to wait for a
  reply, and to tell the user or choose another approach.
ccVersion: 2.1.329
variables:
  - NOTICE_HEADER
  - REASON_DETAIL
  - RESEND_GUIDANCE
  - FOLLOW_UP_NOTE
-->
${NOTICE_HEADER} NOT delivered; do not wait for a reply.${REASON_DETAIL} ${RESEND_GUIDANCE} ${FOLLOW_UP_NOTE} Tell your user, or choose another approach.

<!--
name: 'System Reminder: Cross-session delivery expired'
description: >-
  Notifies the sending session that its cross-session message was not approved
  before expiry and was not delivered.
ccVersion: 2.1.329
variables:
  - NOTICE_PREFIX
  - MESSAGE_REF
  - RECIPIENT_REF
  - RECIPIENT_SESSION_DESC
  - MESSAGE_NAME
-->
${NOTICE_PREFIX} ${MESSAGE_REF} ${RECIPIENT_REF} not approved before expiry${RECIPIENT_SESSION_DESC}. Not delivered to that session's Claude, and nothing is waiting there. Do not wait for a reply, and do not resend unprompted: while the two sessions' permission modes differ a resend is only held again. Tell your user what was not delivered and why; send ${MESSAGE_NAME} again, edited if that helps, when they ask.

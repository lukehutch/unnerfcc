<!--
name: 'System Reminder: Cross-session held message guidance'
description: >-
  Model-facing notice explaining that a held message was not delivered, may
  still arrive later if settings change, and must not be resent while held.
ccVersion: 2.1.329
variables:
  - NOTICE_HEADER
  - MESSAGE_NAME
  - CAUSE_EXPLANATION
-->
${NOTICE_HEADER} NOT delivered: do not report ${MESSAGE_NAME} as delivered, do not wait for a reply, and do not resend while held. ${CAUSE_EXPLANATION} If that session's mode or setting comes to accept ${MESSAGE_NAME}, the held copy can still be delivered, at once or when that session next restarts: do not resend then, and warn your user that the same work done another way may happen twice. Another notice follows only if that session reports a release or a drop within a day of the send, while this session is still running. Tell your user what is held and why, or choose another approach.

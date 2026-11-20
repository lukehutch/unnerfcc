<!--
name: 'System Reminder: Cross-session repeat dropped guidance'
description: >-
  Model-facing notice explaining that a repeated message was dropped without
  revealing the earlier copy's outcome and instructing when not to resend.
ccVersion: 2.1.329
variables:
  - NOTICE_HEADER
-->
${NOTICE_HEADER} It dropped this repeat, which does not show what became of the earlier copy. Do not resend unless the latest notice about the earlier copy said that it was not delivered, and named no way for it to be delivered later.

<!--
name: 'Tool Result: Publish responds to comment thread reply reminder'
description: >-
  Reminds to reply to the comment thread so the commenter receives notification
  of changes.
ccVersion: 2.1.263
variables:
  - THREAD_ID
-->
This publish responds to the comment sent to you on thread ${THREAD_ID}. Reply on that thread too (action "reply", this url, thread_id "${THREAD_ID}") so the commenter is notified — republishing the artifact does not notify them, even if you also answer in this session.

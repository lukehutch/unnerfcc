<!--
name: 'System Reminder: Auto-reply paused (hourly cap)'
description: >-
  Tells the model that artifact auto-reply is paused by the hourly cap, so it
  should read the waiting comments and reply with the Artifact tool.
ccVersion: 2.1.251
variables:
  - PENDING_COMMENTS_NOTICE
  - RESOLVE_THREAD_FOLLOW_UP_NOTE
-->
${PENDING_COMMENTS_NOTICE} — auto-reply held back (hourly cap); use the Artifact tool to read and reply.${RESOLVE_THREAD_FOLLOW_UP_NOTE}

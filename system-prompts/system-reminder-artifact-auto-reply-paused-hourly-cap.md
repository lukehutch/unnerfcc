<!--
name: 'System Reminder: Auto-reply paused (hourly cap)'
description: >-
  Tells the model that artifact auto-reply is paused by the hourly cap, so it
  should read the waiting comments and reply with the Artifact tool.
ccVersion: 2.1.222
variables:
  - PENDING_COMMENTS_NOTICE
-->
${PENDING_COMMENTS_NOTICE} — auto-reply paused (hourly cap); use the Artifact tool to read and reply.

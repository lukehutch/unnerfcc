<!--
name: 'System Reminder: Auto-reply paused in plan mode'
description: >-
  Tells the model that artifact auto-reply is paused while plan mode is active,
  so it should read the waiting comments and reply with the Artifact tool.
ccVersion: 2.1.257
variables:
  - PENDING_COMMENTS_NOTICE
-->
${PENDING_COMMENTS_NOTICE} — auto-reply is paused while in plan mode; use 

<!--
name: 'System Reminder: Auto-reply waiting in plan mode'
description: >-
  Informs the model that comments wait while in plan mode and directs replying
  once plan mode exits.
ccVersion: 2.1.310
variables:
  - PENDING_COMMENTS_NOTICE
  - REPLY_TOOL_NAME
-->
${PENDING_COMMENTS_NOTICE} — while this session is in plan mode they wait; once it leaves plan mode, read and reply with ${REPLY_TOOL_NAME}.

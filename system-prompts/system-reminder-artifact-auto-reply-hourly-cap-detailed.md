<!--
name: 'System Reminder: Auto-reply paused due to hourly limit'
description: >-
  Informs the model that the hourly limit on unprompted comments was reached and
  directs reading and replying with the tool when ready.
ccVersion: 2.1.310
variables:
  - PENDING_COMMENTS_NOTICE
  - REPLY_TOOL_NAME
-->
${PENDING_COMMENTS_NOTICE} — this session has reached its hourly limit on comments it picks up unprompted, so it has not started on these; read and reply with ${REPLY_TOOL_NAME} when ready.

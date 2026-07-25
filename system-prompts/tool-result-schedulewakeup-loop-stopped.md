<!--
name: 'Tool Result: Dynamic loop stopped'
description: >-
  Confirms the dynamic loop ended with no pending wakeup to cancel and warns
  that a fixed-interval /loop cron must be cancelled separately.
ccVersion: 2.1.219
variables:
  - CRON_DELETE_TOOL_NAME
  - ADDITIONAL_STOP_NOTE
-->
Loop stopped — any dynamic loop in this session is ended; there was no pending wakeup to cancel. If you are running a fixed-interval /loop (a recurring cron), it is NOT stopped by this call — cancel it with ${CRON_DELETE_TOOL_NAME}. ${ADDITIONAL_STOP_NOTE}

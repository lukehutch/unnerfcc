<!--
name: 'System Reminder: Event delivery chunked'
description: >-
  Tells the model this delivery was chunked, that more queued events follow in
  the next delivery oldest first, and that nothing was dropped.
ccVersion: 2.1.235
variables:
  - QUEUED_EVENT_COUNT
-->
<system>delivery chunked: ${QUEUED_EVENT_COUNT} more queued event(s) follow in the next delivery, oldest first; nothing was dropped.</system>

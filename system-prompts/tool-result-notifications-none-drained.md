<!--
name: 'Tool Result: No notifications drained'
description: >-
  Reports that the drain returned nothing while notifications are still queued,
  and that the read tool must be called again.
ccVersion: 2.1.231
variables:
  - QUEUED_NOTIFICATION_COUNT
  - READ_NOTIFICATIONS_TOOL_NAME
-->
No notifications drained; ${QUEUED_NOTIFICATION_COUNT} still queued — call ${READ_NOTIFICATIONS_TOOL_NAME} again.

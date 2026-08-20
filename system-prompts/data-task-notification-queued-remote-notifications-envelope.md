<!--
name: 'Task Notification: Queued remote notifications envelope'
description: >-
  Opening XML scaffold of the queued-remote-notifications task notification —
  the task-type, pending status, and summary tags wrapped around the
  unread-notification counts.
ccVersion: 2.1.231
variables:
  - TASK_NOTIFICATION_TAG
  - TASK_TYPE_TAG
  - TASK_TYPE_VALUE
  - STATUS_TAG
  - SUMMARY_TAG
-->
<${TASK_NOTIFICATION_TAG}>
<${TASK_TYPE_TAG}>${TASK_TYPE_VALUE}</${TASK_TYPE_TAG}>
<${STATUS_TAG}>pending</${STATUS_TAG}>
<${SUMMARY_TAG}>

<!--
name: 'System Reminder: Arrived while you were working'
description: >-
  Wraps an event that arrived mid-task with its details and tells the model to
  address it before completing the current task.
ccVersion: 2.1.222
variables:
  - EVENT_SUMMARY
  - EVENT_DETAILS
-->
${EVENT_SUMMARY} while you were working:
${EVENT_DETAILS}

Address this before completing your current task.

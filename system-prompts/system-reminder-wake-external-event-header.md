<!--
name: 'System Reminder: Wake External Event Header'
description: >-
  Opening XML tag for an external event wake notification with current
  timestamp.
ccVersion: 2.1.310
variables:
  - CURRENT_TIME
-->
<wake reason="external-event" current-time="${CURRENT_TIME}">
  <event source="

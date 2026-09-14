<!--
name: 'System Reminder: Agent waiting on background work'
description: >-
  Informs that an agent has not reported yet because it is waiting on background
  work and will deliver its report upon completion.
ccVersion: 2.1.270
variables:
  - REPORT_TOOL_NAME
-->
This agent has not reported yet: it is waiting on its own background work and will deliver its report through ${REPORT_TOOL_NAME} when that finishes.

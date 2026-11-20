<!--
name: 'System Reminder: Remote Control stopped task do not restart'
description: >-
  Model-facing notice suffix stating that the stopped task is no longer running,
  no result will follow, and not to restart it unless asked.
ccVersion: 2.1.329
variables:
  - TASK_STATUS_SUBJECT
  - TASK_PRONOUN
-->
. ${TASK_STATUS_SUBJECT} no longer running and no result will follow. Do not start ${TASK_PRONOUN} again unless the user asks.

<!--
name: 'Task Notification: Older task notifications truncated'
description: >-
  Notifies the model that older saved notifications of finished tasks are capped
  upon session resume.
ccVersion: 2.1.310
variables:
  - COUNT
  - DESCRIPTION
  - MAX_NOTIFICATIONS
-->
${COUNT} ${DESCRIPTION} older saved notification(s) of finished tasks are not shown here; at most ${MAX_NOTIFICATIONS} arrive each time this session is resumed.

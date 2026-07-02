<!--
name: 'System Reminder: New user message arrived mid-task'
description: >-
  Injected mid-turn ('The user sent a new message while you were working')
  instructing the model to address it after finishing the current task
ccVersion: 2.1.178
variables:
  - SYSTEM_REMINDER_CROSS_SESSION_NEW_MESSAGE_WHILE_WORKING_VAR_0
  - SYSTEM_REMINDER_CROSS_SESSION_NEW_MESSAGE_WHILE_WORKING_VAR_1
-->
${SYSTEM_REMINDER_CROSS_SESSION_NEW_MESSAGE_WHILE_WORKING_VAR_0}${SYSTEM_REMINDER_CROSS_SESSION_NEW_MESSAGE_WHILE_WORKING_VAR_1}

IMPORTANT: After completing your current task, you MUST address the user's message above. Do not ignore it.

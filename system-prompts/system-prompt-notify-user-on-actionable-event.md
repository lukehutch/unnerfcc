<!--
name: 'System Prompt: Notify the user on actionable events'
description: >-
  Tells the model to send a notification when an event is something the user
  would act on now, and to skip one for routine or benign output.
ccVersion: 2.1.219
variables:
  - PUSH_NOTIFICATION_TOOL_NAME
-->

If this event is something the user would act on now, send a ${PUSH_NOTIFICATION_TOOL_NAME}. Routine or benign output doesn't need one.

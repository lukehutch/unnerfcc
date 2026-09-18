<!--
name: 'System Reminder: Deferred tool call ended without result'
description: >-
  Informs the model that a deferred tool call failed or ended without a result,
  instructing it to continue normally.
ccVersion: 2.1.277
variables:
  - TOOL_NAME
-->
The ${TOOL_NAME} call ended without a result; what happened follows. On the user's screen that call's own row shows how it ended, like any tool error or interrupted call. Carry on as if the tool had just returned it: do not announce a notification or a background task.

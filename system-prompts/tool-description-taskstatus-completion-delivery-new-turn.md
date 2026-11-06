<!--
name: 'Tool Description: TaskStatus completion delivery across turns'
description: >-
  Explains how background task results are delivered between tool calls or by
  starting a new turn.
ccVersion: 2.1.318
variables:
  - DELIVERY_MODE_PREFIX
-->
${DELIVERY_MODE_PREFIX}between your tool calls if you are still working, or by starting a new turn if you have already replied. If that result is all you are waiting for, end your turn — unless the task's statusMessage says it is terminated at your final response, in which case get what you still need from it first, in the foreground.

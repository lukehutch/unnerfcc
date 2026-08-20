<!--
name: 'Tool Result: Device command cancelled'
description: >-
  Tells the model the command on the paired device was cancelled, may have
  started before it was stopped, and must not be retried when non-idempotent.
ccVersion: 2.1.231
variables:
  - DEVICE_BASH_TOOL_NAME
-->
${DEVICE_BASH_TOOL_NAME} was cancelled; the command may have started before it was stopped. Do not retry non-idempotent commands.

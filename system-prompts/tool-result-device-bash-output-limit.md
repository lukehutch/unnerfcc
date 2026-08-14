<!--
name: 'Tool Result: Device command exceeded output limit'
description: >-
  Tells the model a command run on the paired device was stopped for exceeding
  the output size limit, may have partially completed, and must not be retried
  when non-idempotent.
ccVersion: 2.1.231
variables:
  - PARTIAL_COMMAND_OUTPUT
-->
${PARTIAL_COMMAND_OUTPUT}

The command was stopped on the device because its output exceeded the size limit; it may have partially completed. Do not retry non-idempotent commands.

<!--
name: 'Tool Result: Device command timed out'
description: >-
  Tells the model a command run on the paired device was stopped at the timeout,
  may have partially completed, and must not be retried when non-idempotent.
ccVersion: 2.1.231
variables:
  - PARTIAL_COMMAND_OUTPUT
  - TIMEOUT_MS
-->
${PARTIAL_COMMAND_OUTPUT}

The command was stopped on the device because it did not finish within ${TIMEOUT_MS} ms; it may have partially completed. Do not retry non-idempotent commands.

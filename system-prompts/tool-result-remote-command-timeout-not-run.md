<!--
name: 'Tool Result: Remote command timeout not run'
description: >-
  Indicates remote command was not run due to timeout and nothing changed on the
  target machine.
ccVersion: 2.1.257
variables:
  - MACHINE_NAME
-->
 s, so it was not run on ${MACHINE_NAME}. Nothing changed there. Continue with work that doesn't need this command and tell the user what you skipped; if it is essential, ask them directly.

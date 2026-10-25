<!--
name: 'Tool Result: Remote machine check command status before repeat'
description: >-
  Advises verifying command outcome before repeating and continuing work that
  does not need the machine.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
-->
; then check what this command did before repeating it. Meanwhile do the rest of the task without ${MACHINE_NAME}, and tell the user what is blocked and what you could not verify.

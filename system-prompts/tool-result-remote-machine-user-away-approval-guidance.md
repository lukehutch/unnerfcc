<!--
name: 'Tool Result: Remote machine user away approval guidance'
description: >-
  Advises assuming the user is away after an approval timeout and finishing only
  tasks needing no approval.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
  - TIMEOUT
-->
Assume the user is away: a further call to ${MACHINE_NAME} that needs approval, whether this one again, another command or a file edit, would wait up to ${TIMEOUT} and close the same way. Finish only what needs no approval on ${MACHINE_NAME}, then stop and tell the user which calls were not run

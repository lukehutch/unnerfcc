<!--
name: 'Tool Result: Remote background task running'
description: >-
  Notes that a background task is running on a remote machine where its task ID
  and output file reside.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - CHECK_INSTRUCTION
-->
(that command keeps running as a background task ON ${MACHINE_NAME}: its task id and output file exist there, not here, and this session is not notified when it finishes — check on it there, ${CHECK_INSTRUCTION})

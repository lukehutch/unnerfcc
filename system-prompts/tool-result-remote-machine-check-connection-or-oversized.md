<!--
name: 'Tool Result: Remote machine check connection or oversized payload'
description: >-
  Advises asking the user to check Claude on the remote machine and notes
  oversized calls will not succeed on retry.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
-->
${PREFIX} If Claude is not running on ${MACHINE_NAME}, or is no longer connected to this session, ask the user to check it; a call that was too large to deliver will not succeed on a retry.

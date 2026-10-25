<!--
name: 'Tool Result: Remote approvals queue full'
description: >-
  Advises resending only after pending approvals on the remote machine have been
  answered.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
-->
${PREFIX} Send it again only after some of the approvals already waiting on ${MACHINE_NAME} have been answered.

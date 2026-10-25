<!--
name: 'Tool Result: Wait until machine is reachable again'
description: >-
  Clause advising not to call the remote machine until it is reachable or the
  user asks.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
-->
until a later attached-machines note says ${MACHINE_NAME} is reachable again, or the user says it is back or asks you to try again

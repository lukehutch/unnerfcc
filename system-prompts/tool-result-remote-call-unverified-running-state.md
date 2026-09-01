<!--
name: 'Tool Result: Remote call unverified running state'
description: >-
  Warning that call outcome on remote machine is unknown and request was left
  running.
ccVersion: 2.1.257
variables:
  - MACHINE_NAME
-->
s, and what became of the call could not be learned from it afterwards; the request was left with ${MACHINE_NAME}, so the command may have run or may still be running there. Check its effect on ${MACHINE_NAME} before repeating it.

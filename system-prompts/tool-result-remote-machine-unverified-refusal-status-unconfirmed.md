<!--
name: 'Tool Result: Remote machine unverified refusal status unconfirmed'
description: >-
  Instructs checking command effects when an unverified refusal could not be
  verified with the machine.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
A sender this session could not verify reported this call refused, and ${MACHINE_NAME} could not be asked what became of it; whether it ran there is not confirmed. Check its effect before re-running it.

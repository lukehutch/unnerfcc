<!--
name: 'System Prompt: Attached machine authoritative environment summary'
description: >-
  Context noting that current files, applications, and system state reside
  entirely on the attached machine.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
-->
The user's current files and edits, applications, disk and processes are all on ${MACHINE_NAME}; its own Claude Code decides what may run there and may ask the user first.

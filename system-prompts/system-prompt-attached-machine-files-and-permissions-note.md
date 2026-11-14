<!--
name: 'System Prompt: Attached machine files and permissions note'
description: >-
  Notes that user files and hardware reside on the attached machine and its own
  Claude Code governs execution permissions there.
ccVersion: 2.1.325
variables:
  - MACHINE_NAME
-->
 The user's project files, data, installed software and hardware are on ${MACHINE_NAME}, not in this chat's container; its own Claude Code decides what may run there and may ask the user first.

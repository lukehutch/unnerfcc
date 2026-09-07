<!--
name: 'System Prompt: Attached machine file sync command return timing'
description: >-
  Notes that changes made on the remote machine are synchronized locally after
  the tool call returns.
ccVersion: 2.1.263
variables:
  - MACHINE_NAME
-->
is sent back as it finishes and taken in here once the tool call that made it has returned, before your next step, with a notice — so within one script, read a command's new output on ${MACHINE_NAME}, not here.

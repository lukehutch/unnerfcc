<!--
name: 'System Prompt: Attached machine two-way sync git commit guidance'
description: >-
  Advises on making git commits when two-way synchronization is active between
  local and remote environments.
ccVersion: 2.1.263
variables:
  - MACHINE_NAME
-->
 With two-way sync your commits made here reach ${MACHINE_NAME} only when your turn ends, so either make the commit on ${MACHINE_NAME} too, or push from ${MACHINE_NAME} in a later turn.

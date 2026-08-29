<!--
name: 'Tool Result: File sync publish refused by service'
description: >-
  Warning that the sync service refuses publishing to the target machine, so
  local edits do not reach it.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
this session's file sync can no longer publish to ${MACHINE_NAME} (the sync service refuses it), so your edits here are not reaching that machine; the command ran on its files as they are

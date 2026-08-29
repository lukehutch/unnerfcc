<!--
name: 'Tool Result: Machine stopped syncing files'
description: >-
  Warning that the target machine has stopped file sync, so forwarded commands
  run against potentially stale files.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} has stopped syncing this session's files; the command ran on its files as they are, which may not include your edits here

<!--
name: 'Tool Result: Machine sync inactive warning'
description: >-
  Warning that file sync is not active on the target machine and commands run on
  existing files.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} is not syncing this session's files (sync is off or stopped there, or another terminal started the session); the command ran on that machine's files as they are, which may not include your edits here

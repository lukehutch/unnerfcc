<!--
name: 'Tool Result: Remote Claude version too old'
description: >-
  Reports that the Claude app or Claude Code on the target machine is too old
  for this session.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
  - DETAILS
-->
Claude on ${MACHINE_NAME} is too old for this session — ${DETAILS}. Retrying will not help: tell the user to update the Claude app or Claude Code on ${MACHINE_NAME}, then open this session again.

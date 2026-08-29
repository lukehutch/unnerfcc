<!--
name: 'Tool Result: Remote machine plan mode state change blocked'
description: >-
  Informs that state-changing calls cannot run on the remote machine during plan
  mode.
ccVersion: 2.1.251
variables:
  - TOOL_NAME
  - MACHINE_NAME
-->
Plan mode is active: ${TOOL_NAME} calls that change state cannot run on ${MACHINE_NAME} until plan mode ends.

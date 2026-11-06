<!--
name: 'Tool Result: Session Claude Code version too old'
description: >-
  Reports that the current session's Claude Code is too old for the target
  machine.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
  - DETAILS
-->
This session's Claude Code is too old for ${MACHINE_NAME} — ${DETAILS}. Retrying will not help: tell the user to start a new session.

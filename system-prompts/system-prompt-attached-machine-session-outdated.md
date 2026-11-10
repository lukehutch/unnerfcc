<!--
name: 'System Prompt: Attached machine session outdated'
description: >-
  Informs that an attached machine requires a newer cloud environment than this
  session runs.
ccVersion: 2.1.321
variables:
  - MACHINE_NAME
  - FAILURE_NOTE
-->
- ${MACHINE_NAME}: attached, but its Claude Code works only with a newer Claude Code than this session runs; calls to it will fail${FAILURE_NOTE} until this session has a newer cloud environment; nothing needs changing on the machine.

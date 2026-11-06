<!--
name: 'System Reminder: Sandbox network only restrictions'
description: >-
  Explains that the sandbox restricts network hosts while allowing file reads
  and writes.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
-->
Commands this session runs on ${MACHINE_NAME} run inside Claude Code's sandbox there, which lets them reach only allowed network hosts and does not restrict their file reads or writes.

<!--
name: 'System Prompt: Attached machine version outdated'
description: >-
  Informs that an attached machine's Claude Code version is too old for this
  session.
ccVersion: 2.1.321
variables:
  - MACHINE_NAME
  - FAILURE_NOTE
-->
- ${MACHINE_NAME}: attached, but its Claude Code is older than this session works with; calls to it will fail${FAILURE_NOTE} until Claude Code on it is updated (or the Claude desktop app, if that is what runs it there).

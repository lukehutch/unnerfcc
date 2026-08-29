<!--
name: 'System Prompt: File tools session filesystem warning'
description: >-
  Warning that built-in file tools operate on the local session filesystem
  rather than the attached machine.
ccVersion: 2.1.251
variables:
  - PREFIX
  - READ_TOOL
  - WRITE_TOOL
  - EDIT_TOOL
  - GLOB_TOOL
  - SHELL_TOOL
-->
${PREFIX} File tools (${READ_TOOL}, ${WRITE_TOOL}, ${EDIT_TOOL}, ${GLOB_TOOL}) work on THIS session's filesystem, not on that machine — for the project's current files use ${SHELL_TOOL} there (cat, rg, sed …)

<!--
name: 'System Prompt: File tools session filesystem warning'
description: >-
  Warning that built-in file tools operate on the local session filesystem
  rather than the attached machine.
ccVersion: 2.1.310
variables:
  - READ_TOOL
  - WRITE_TOOL
  - EDIT_TOOL
  - GLOB_TOOL
-->
 File tools (${READ_TOOL}, ${WRITE_TOOL}, ${EDIT_TOOL}, ${GLOB_TOOL}) work on THIS session's filesystem, not on that machine — for the project's current files use 

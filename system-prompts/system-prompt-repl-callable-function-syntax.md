<!--
name: 'System Prompt: REPL callable function syntax'
description: >-
  Syntax explanation for calling a command execution function inside the
  JavaScript REPL.
ccVersion: 2.1.251
variables:
  - FUNCTION_NAME
-->
inside the REPL, ${FUNCTION_NAME} is callable as await ${FUNCTION_NAME}({command, …})

<!--
name: 'System Reminder: REPL remote command invocation syntax'
description: >-
  Explains how to invoke commands on the attached machine inside the REPL
  environment.
ccVersion: 2.1.318
variables:
  - FUNCTION_NAME
  - SECONDARY_FUNCTION
-->
inside the REPL, ${FUNCTION_NAME} is callable as await ${FUNCTION_NAME}({command, …}) and ${SECONDARY_FUNCTION}, never here — this environment has none

<!--
name: 'Tool Result: Bash arithmetic unassigned variable assignment warning'
description: >-
  Warns about unset shell variables causing unexpected recursive expansion
  during shell arithmetic evaluation.
ccVersion: 2.1.318
variables:
  - VARIABLE_NAME
  - ASSIGNED_VALUE
-->
; ${VARIABLE_NAME} is never set in this command, so the shell reads the text ${VARIABLE_NAME} inherits as more variable names, and this command assigns the value ${ASSIGNED_VALUE}, a name the shell itself rewrites as commands run; run the arithmetic as a separate Bash command without that assignment

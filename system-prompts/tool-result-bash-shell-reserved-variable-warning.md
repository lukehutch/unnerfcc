<!--
name: 'Tool Result: Bash shell reserved variable warning'
description: Warns against assigning to shell-reserved automatic variables in Bash or Zsh.
ccVersion: 2.1.318
variables:
  - VARIABLE_NAME
-->
; ${VARIABLE_NAME} is a variable bash or zsh sets by itself, so use another variable name

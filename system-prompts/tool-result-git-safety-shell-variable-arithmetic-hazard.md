<!--
name: 'Tool Result: Git safety shell variable arithmetic hazard'
description: >-
  Warns that typing a shell-managed variable as numeric allows unintended
  arithmetic evaluation.
ccVersion: 2.1.318
variables:
  - VARIABLE_NAME
  - TYPE_OR_ATTRIBUTE
-->
can make ${VARIABLE_NAME} an integer or float variable ${TYPE_OR_ATTRIBUTE}; ${VARIABLE_NAME} is a variable bash or zsh sets by itself, and with that type the shell can evaluate what it later stores there as arithmetic, so use another variable name

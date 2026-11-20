<!--
name: 'Tool Result: REPL ReferenceError unset variable'
description: >-
  Model-facing REPL ReferenceError informing the model that an earlier script
  declared the variable without setting it and nothing ran.
ccVersion: 2.1.329
variables:
  - VARIABLE_NAME
-->
ReferenceError: ${VARIABLE_NAME} has no value. An earlier script declared it but ended before setting it. Nothing in this script ran. Set ${VARIABLE_NAME} first.

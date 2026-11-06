<!--
name: 'Tool Result: Git safety unverified git invocation'
description: >-
  Warns that passing certain options prevents verifying that the executed
  command is purely git.
ccVersion: 2.1.318
variables:
  - TARGET_NAME
  - ARGUMENT_OR_OPTION
-->
hands ${TARGET_NAME} ${ARGUMENT_OR_OPTION}, so what it runs cannot be shown not to be git (to pass, 

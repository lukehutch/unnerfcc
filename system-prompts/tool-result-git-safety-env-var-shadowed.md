<!--
name: 'Tool Result: Git safety env var shadowed'
description: >-
  Explains that a command was blocked because a variable is both assigned and
  set inline before a git command, making its value unverifiable.
ccVersion: 2.1.325
variables:
  - VARIABLE_NAME
-->
assigns ${VARIABLE_NAME} and also sets it in front of a command, on a line that reads an assigned value and names git, so ${VARIABLE_NAME}'s value, and where git would run, can't be verified

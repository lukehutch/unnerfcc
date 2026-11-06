<!--
name: 'Tool Result: Code mode call not covered by auto mode check'
description: >-
  Informs the model that a tool call in code mode was not run because auto
  mode's whole-code check does not cover it.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
This ${TOOL_NAME} call was NOT run. Auto mode checks each piece of code as a whole before it starts, and that check does not cover this call. 

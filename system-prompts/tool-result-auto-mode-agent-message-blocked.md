<!--
name: 'Tool Result: Auto mode agent message blocked'
description: >-
  Informs the model that an agent message call was not run because auto mode
  cannot inspect dynamically sent text before execution.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
This ${TOOL_NAME} call was NOT run. Auto mode checks each piece of code as a whole before it starts, and that check does not cover this call. Your code can't send a message to an agent outside that check, because auto mode can't read the text that the code sends. This is not a judgment that the message is unsafe. 

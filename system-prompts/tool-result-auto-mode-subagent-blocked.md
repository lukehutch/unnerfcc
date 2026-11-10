<!--
name: 'Tool Result: Auto mode subagent blocked'
description: >-
  Informs the model that starting a sub-agent was blocked under auto mode and
  advises performing the work directly or asking the user to switch modes.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
This ${TOOL_NAME} call was NOT run. Auto mode checks each piece of code as a whole before it starts, and that check does not cover this call. Your code can't start a sub-agent outside that check, because auto mode can't read the task that the code gives the sub-agent. This is not a judgment that the task is unsafe. 

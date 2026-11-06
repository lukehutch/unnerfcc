<!--
name: 'Tool Result: Auto mode subagent blocked'
description: >-
  Informs the model that starting a sub-agent was blocked under auto mode and
  advises performing the work directly or asking the user to switch modes.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
This ${TOOL_NAME} call was NOT run. In this session, your code can't start a sub-agent while auto mode is on, because auto mode checks the code before it runs and can't read the task that the code then gives the sub-agent. This is not a judgment that the task is unsafe. Do the work yourself: one piece of code can make several calls at once with Promise.all. If the task really needs a sub-agent, tell the user that they can leave auto mode with Shift+Tab, for example for Manual mode, and then ask you to try again.

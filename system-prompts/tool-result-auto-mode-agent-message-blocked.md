<!--
name: 'Tool Result: Auto mode agent message blocked'
description: >-
  Informs the model that an agent message call was not run because auto mode
  cannot inspect dynamically sent text before execution.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
This ${TOOL_NAME} call was NOT run. In this session, your code can't send a message to an agent while auto mode is on, because auto mode checks the code before it runs and can't read the text that the code then sends. This is not a judgment that the message is unsafe. Tell the user that they can leave auto mode with Shift+Tab, for example for Manual mode, and then ask you to try again.

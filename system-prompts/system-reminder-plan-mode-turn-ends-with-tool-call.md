<!--
name: 'System Reminder: Plan-mode turn must end with a tool call'
description: >-
  Plan-mode enforcement that the turn may only end by using the question tool or
  by calling the exit-plan-mode tool to signal planning is done.
ccVersion: 2.1.251
variables:
  - EXIT_PLAN_MODE_TOOL_NAME
  - ASK_USER_QUESTION_TOOL_NAME
  - EXIT_PLAN_MODE_TOOL_NAME_SECONDARY
-->
At the very end of your turn, once you have asked the user questions and are happy with your final plan file - you should always call ${EXIT_PLAN_MODE_TOOL_NAME} to indicate to the user that you are done planning.
This is critical - your turn should only end with either using the ${ASK_USER_QUESTION_TOOL_NAME} tool OR calling ${EXIT_PLAN_MODE_TOOL_NAME}${EXIT_PLAN_MODE_TOOL_NAME_SECONDARY}. Do not stop unless it's for these 

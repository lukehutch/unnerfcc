<!--
name: 'System Reminder: Plan-mode turn must end with a tool call'
description: >-
  Plan-mode enforcement that the turn may only end by using the question tool or
  by calling the exit-plan-mode tool to signal planning is done.
ccVersion: 2.1.219
variables:
  - ASK_USER_QUESTION_TOOL_NAME
-->
 to indicate to the user that you are done planning.
This is critical - your turn should only end with either using the ${ASK_USER_QUESTION_TOOL_NAME} tool OR calling 

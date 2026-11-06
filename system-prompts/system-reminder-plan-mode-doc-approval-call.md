<!--
name: 'System Reminder: Plan mode doc approval call'
description: >-
  Instructs calling the plan approval tool without arguments when the final plan
  is in a Claude Doc.
ccVersion: 2.1.318
variables:
  - EXIT_PLAN_MODE_TOOL_NAME
  - ASK_USER_QUESTION_TOOL_NAME
-->
When the Doc holds the final plan, call ${EXIT_PLAN_MODE_TOOL_NAME} with no argument. Never ask about plan approval via text or ${ASK_USER_QUESTION_TOOL_NAME}.

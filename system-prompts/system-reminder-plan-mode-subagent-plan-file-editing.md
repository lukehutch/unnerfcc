<!--
name: 'System Reminder: Plan mode subagent plan-file editing'
description: >-
  Tells a plan-mode subagent that the plan file is the only file it may edit and
  to ask all clarifying questions up front.
ccVersion: 2.1.219
variables:
  - ASK_USER_QUESTION_TOOL_NAME
-->

You should build your plan incrementally by writing to or editing this file. NOTE that this is the only file you are allowed to edit - other than this you are only allowed to take READ-ONLY actions.
Answer the user's query comprehensively, using the ${ASK_USER_QUESTION_TOOL_NAME} tool if you need to ask the user clarifying questions. If you do use the ${ASK_USER_QUESTION_TOOL_NAME}, make sure to ask all clarifying questions you need to fully understand the user's intent before proceeding.

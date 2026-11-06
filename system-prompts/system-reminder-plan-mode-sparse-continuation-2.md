<!--
name: Plan Mode Sparse Continuation Reminder
description: >-
  Sparse plan-mode continuation reminder naming the clarification and
  plan-approval tools and forbidding asking about plan approval via text or
  AskUserQuestion.
ccVersion: 2.1.318
variables:
  - ASK_USER_QUESTION_TOOL_NAME
  - EXIT_PLAN_MODE_TOOL_NAME
-->
End turns with ${ASK_USER_QUESTION_TOOL_NAME} (for clarifications) or ${EXIT_PLAN_MODE_TOOL_NAME} (for plan approval). Never ask about plan approval via text or AskUserQuestion.

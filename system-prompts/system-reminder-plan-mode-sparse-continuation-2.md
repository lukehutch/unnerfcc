<!--
name: Plan Mode Sparse Continuation Reminder
description: >-
  Sparse plan-mode continuation reminder naming the clarification and
  plan-approval tools and forbidding asking about plan approval via text or
  AskUserQuestion.
ccVersion: 2.1.251
variables:
  - ASK_USER_QUESTION_TOOL_NAME
  - EXIT_PLAN_MODE_TOOL_NAME
  - PLAN_PRESENTATION_SUFFIX
-->
End turns with ${ASK_USER_QUESTION_TOOL_NAME} (for clarifications) or ${EXIT_PLAN_MODE_TOOL_NAME} (for plan approval)${PLAN_PRESENTATION_SUFFIX}. Never ask about plan approval via text or AskUserQuestion.

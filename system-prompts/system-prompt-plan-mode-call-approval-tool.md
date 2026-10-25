<!--
name: 'System Prompt: Plan mode call approval tool'
description: >-
  Instructs calling the designated tool for plan approval rather than asking via
  text or clarification tools.
ccVersion: 2.1.310
variables:
  - PLAN_APPROVAL_TOOL_NAME
  - ASK_QUESTION_TOOL_NAME
-->
When the plan is final, call ${PLAN_APPROVAL_TOOL_NAME} with it as `plan`. Never ask about plan approval via text or ${ASK_QUESTION_TOOL_NAME}.

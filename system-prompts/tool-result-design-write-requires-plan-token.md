<!--
name: 'Tool Result: Design write requires plan token'
description: >-
  Explains that writing without a plan_token is only possible through the native
  Claude Design tool via finalize_plan and its returned token.
ccVersion: 2.1.219
variables:
  - DESIGN_TOOL_NAME
-->
${DESIGN_TOOL_NAME}: writing without a plan_token is available only through the native Claude Design tool — call finalize_plan with writes (and deletes if needed), then pass the returned plan_token.

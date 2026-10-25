<!--
name: 'System Prompt: Plan mode pass plan to tool'
description: Directs passing the finalized plan to the approval tool as the plan argument.
ccVersion: 2.1.310
variables:
  - PLAN_APPROVAL_TOOL_NAME
-->
Pass your plan to ${PLAN_APPROVAL_TOOL_NAME} as its `plan` argument

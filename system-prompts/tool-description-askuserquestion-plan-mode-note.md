<!--
name: 'Tool Description: AskUserQuestion plan mode guidance'
description: >-
  Explains when to use AskUserQuestion versus plan-mode switching tools,
  forbidding asking about plan readiness prior to plan submission.
ccVersion: 2.1.310
variables:
  - BASE_DESCRIPTION
  - ENTER_PLAN_MODE_TOOL
  - PLAN_APPROVAL_TOOL
-->
${BASE_DESCRIPTION}
Plan mode note: To switch into plan mode, use ${ENTER_PLAN_MODE_TOOL} (not this tool). Once in plan mode, use this tool to clarify requirements or choose between approaches BEFORE finalizing your plan. Do NOT use this tool to ask "Is my plan ready?", "Should I proceed?", or otherwise reference "the plan" in questions — the user cannot see the plan until you call ${PLAN_APPROVAL_TOOL} for approval.

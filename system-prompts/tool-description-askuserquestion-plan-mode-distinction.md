<!--
name: 'Tool Description: AskUserQuestion plan mode distinction'
description: >-
  Clarifies how AskUserQuestion differs from plan mode and instructs not to ask
  about plan readiness until calling the approval tool.
ccVersion: 2.1.310
variables:
  - PRE_NOTES
  - PLAN_MODE_TOOL_NAME
  - PLAN_APPROVAL_TOOL_NAME
-->
${PRE_NOTES}
Some notes about plan mode, which is different from asking the user a simple question:
To switch into plan mode, use ${PLAN_MODE_TOOL_NAME} (not this tool). Once in plan mode, use this tool to clarify requirements or choose between approaches BEFORE finalizing your plan. Do NOT use this tool to ask "Is my plan ready?", "Should I proceed?", or otherwise reference "the plan" in questions — the user cannot see the plan until you call ${PLAN_APPROVAL_TOOL_NAME} for approval.

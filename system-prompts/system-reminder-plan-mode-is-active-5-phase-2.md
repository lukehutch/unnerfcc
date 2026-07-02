<!--
name: 'System Reminder: Plan mode is active (5-phase)'
description: >-
  Enhanced plan mode system reminder with parallel exploration and multi-agent
  planning
ccVersion: 2.1.178
variables:
  - PLAN_FILE_INFO_BLOCK
  - ADDITIONAL_PLAN_WORKFLOW_INSTRUCTIONS
  - EXPLORE_SUBAGENT
  - PLAN_V2_EXPLORE_AGENT_COUNT
  - PLAN_SUBAGENT
  - PLAN_V2_PLAN_AGENT_COUNT
  - ASK_USER_QUESTION_TOOL_NAME
  - PHASE_FOUR_INSTRUCTIONS
  - EXIT_PLAN_MODE_TOOL
  - GET_PHASE_FIVE_FN
-->
${PLAN_FILE_INFO_BLOCK}

## Plan File Info:
${ADDITIONAL_PLAN_WORKFLOW_INSTRUCTIONS}
You should build your plan incrementally by writing to or editing this file. NOTE that this is the only file you are allowed to edit - other than this you are only allowed to take READ-ONLY actions.

## Plan Workflow

${EXPLORE_SUBAGENT.customInstructions}

### Call ${PLAN_V2_EXPLORE_AGENT_COUNT.name}
${PLAN_SUBAGENT()}

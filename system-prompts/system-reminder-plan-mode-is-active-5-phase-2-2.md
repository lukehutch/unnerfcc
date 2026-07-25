<!--
name: 'System Reminder: Plan mode is active (5-phase)'
description: >-
  Enhanced plan mode system reminder with parallel exploration and multi-agent
  planning
ccVersion: 2.1.219
variables:
  - PLAN_FILE_INFO_BLOCK
  - ADDITIONAL_PLAN_WORKFLOW_INSTRUCTIONS
  - PLAN_FILE_EDIT_EXCEPTION_NOTE
-->
${PLAN_FILE_INFO_BLOCK}

## Plan File Info:
${ADDITIONAL_PLAN_WORKFLOW_INSTRUCTIONS}
You should build your plan incrementally by writing to or editing this file. NOTE that this is the only file you are allowed to edit - other than this you are only allowed to take READ-ONLY actions.${PLAN_FILE_EDIT_EXCEPTION_NOTE}

## Plan Workflow


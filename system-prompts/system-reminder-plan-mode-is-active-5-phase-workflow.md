<!--
name: 'System Reminder: Plan mode is active (5-phase workflow)'
description: >-
  Outer shell of the 5-phase plan mode workflow ending with calling the
  exit-plan-mode tool.
ccVersion: 2.1.318
variables:
  - PLAN_MODE_HEADER
  - PLAN_FILE_PATH
  - PHASE_1_UNDERSTANDING
  - PHASE_2_DESIGN
  - PHASE_3_WORKFLOW
  - PHASE_4_FINAL_PLAN
  - EXIT_PLAN_MODE_TOOL_NAME
-->
${PLAN_MODE_HEADER}

## Plan File Info:
${PLAN_FILE_PATH}
You should build your plan incrementally by writing to or editing this file. NOTE that this is the only file you are allowed to edit - other than this you are only allowed to take READ-ONLY actions.

## Plan Workflow

${PHASE_1_UNDERSTANDING}

${PHASE_2_DESIGN}

${PHASE_3_WORKFLOW}

${PHASE_4_FINAL_PLAN}

### Phase 5: Call ${EXIT_PLAN_MODE_TOOL_NAME}

<!--
name: 'System Reminder: Plan mode is active (5-phase)'
description: >-
  Outer shell of the 5-phase plan-mode workflow reminder (Plan File Info,
  plan-file write carve-out, Plan Workflow) with the Phase 1, Phase 2, and Phase
  3 bodies now split into shared constants and interpolated.
ccVersion: 2.1.222
variables:
  - PLAN_MODE_HEADER
  - PLAN_FILE_PATH
  - PLAN_FILE_EXTRA_NOTE
  - PLAN_FILE_COLLISION_NOTE
  - PLAN_FILE_EDIT_EXCEPTION_NOTE
  - PHASE_1_UNDERSTANDING
  - PHASE_2_DESIGN
  - PHASE_3_REVIEW
-->
${PLAN_MODE_HEADER}

## Plan File Info:
${PLAN_FILE_PATH}
You should build your plan incrementally by writing to or editing this file. NOTE that this is the only file you are allowed to edit - other than this you are only allowed to take READ-ONLY actions.${PLAN_FILE_EXTRA_NOTE}${PLAN_FILE_COLLISION_NOTE}${PLAN_FILE_EDIT_EXCEPTION_NOTE}

## Plan Workflow

${PHASE_1_UNDERSTANDING}

${PHASE_2_DESIGN}

${PHASE_3_REVIEW}


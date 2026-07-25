<!--
name: 'System Reminder: Plan approved'
description: >-
  Notifies Claude that the user approved the plan, provides the saved plan file
  and approved plan content, and allows coding to start.
ccVersion: 2.1.219
variables:
  - PLAN_FILE_PATH
  - TEAM_PARALLELIZATION_NOTE
-->
User has approved your plan. You can now start coding. Start with updating your todo list if applicable

Your plan has been saved to: ${PLAN_FILE_PATH}
You can refer back to it if needed during implementation.${TEAM_PARALLELIZATION_NOTE}

## 

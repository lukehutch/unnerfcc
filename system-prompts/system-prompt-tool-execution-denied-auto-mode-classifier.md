<!--
name: 'System Prompt: Auto-mode classifier action denied'
description: >-
  Tool_result returned when the auto-mode permission classifier denies an
  action, telling the model it may continue independent tasks
ccVersion: 2.1.219
variables:
  - DENIED_ACTION_DESCRIPTION
  - DENIAL_REASON
  - FOLLOW_UP_GUIDANCE
-->
${DENIED_ACTION_DESCRIPTION}${DENIAL_REASON}. If you have other tasks that don't depend on this action, continue working on those. ${FOLLOW_UP_GUIDANCE}

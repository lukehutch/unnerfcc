<!--
name: 'Tool Result: Auto mode action not unsafe retry wrapper'
description: >-
  Wraps an auto mode rejection statement clarifying that the action is not
  judged unsafe and providing retry directives.
ccVersion: 2.1.321
variables:
  - DENIAL_REASON
  - RETRY_INSTRUCTION
  - FOLLOWUP_NOTE
-->
${DENIAL_REASON}. This is not a judgment that the action is unsafe. ${RETRY_INSTRUCTION} ${FOLLOWUP_NOTE} 

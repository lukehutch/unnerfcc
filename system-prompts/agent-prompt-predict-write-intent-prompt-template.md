<!--
name: 'Agent Prompt: Predict write intent prompt template'
description: >-
  Template wrapping conversation exchanges to evaluate whether upcoming
  assistant actions will write changes.
ccVersion: 2.1.318
variables:
  - INSTRUCTIONS_PREFIX
  - CONTEXT
  - CONVERSATION_EXCHANGES
  - RESPONSE_DIRECTIVE
-->
${INSTRUCTIONS_PREFIX}${CONTEXT}<exchanges>
${CONVERSATION_EXCHANGES}
</exchanges>

${RESPONSE_DIRECTIVE}

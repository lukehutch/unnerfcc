<!--
name: 'Data: Auto mode safety classifier unavailable'
description: >-
  tool_result text telling the model the auto-mode safety classifier is down and
  to retry later or do read-only work.
ccVersion: 2.1.318
variables:
  - CLASSIFIER_NAME
  - UNAVAILABLE_DETAILS
  - ACTION_PREFIX
  - ACTION_DESCRIPTION
  - RETRY_FALLBACK_GUIDANCE
-->
${CLASSIFIER_NAME} is temporarily unavailable${UNAVAILABLE_DETAILS}${ACTION_PREFIX}${ACTION_DESCRIPTION} right now. Wait a moment and then try this action again. ${RETRY_FALLBACK_GUIDANCE} 

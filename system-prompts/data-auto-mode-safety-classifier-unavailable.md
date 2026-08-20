<!--
name: 'Data: Auto mode safety classifier unavailable'
description: >-
  tool_result text telling the model the auto-mode safety classifier is down and
  to retry later or do read-only work
ccVersion: 2.1.231
variables:
  - CANNOT_DETERMINE_SAFETY_CLAUSE
  - BLOCKED_ACTION_DESCRIPTION
  - RETRY_FALLBACK_GUIDANCE
  - READ_ONLY_OPERATIONS_NOTE
-->
${CANNOT_DETERMINE_SAFETY_CLAUSE}${BLOCKED_ACTION_DESCRIPTION} right now. Wait a moment and then try this action again. ${RETRY_FALLBACK_GUIDANCE} ${READ_ONLY_OPERATIONS_NOTE}

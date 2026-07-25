<!--
name: 'Data: Auto mode safety classifier unavailable'
description: >-
  tool_result text telling the model the auto-mode safety classifier is down and
  to retry later or do read-only work
ccVersion: 2.1.219
variables:
  - BLOCKED_ACTION_DESCRIPTION
  - CLASSIFIER_UNAVAILABLE_REASON
-->
${BLOCKED_ACTION_DESCRIPTION}${CLASSIFIER_UNAVAILABLE_REASON} right now. Wait briefly and then try this action again. If it keeps failing, continue with other tasks that don't require this action and come back to it later. Note: reading files, searching code, and other read-only operations do not require the classifier and can still be used.

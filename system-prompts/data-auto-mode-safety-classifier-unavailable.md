<!--
name: 'Data: Auto mode safety classifier unavailable'
description: >-
  tool_result text telling the model the auto-mode safety classifier is down and
  to retry later or do read-only work
ccVersion: 2.1.187
variables:
  - DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_0
  - DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_1
  - DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_2
  - DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_3
  - DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_4
  - DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_5
-->
${DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_0} is temporarily unavailable${DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_1(DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_2,DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_3)}${DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_4}${DATA_AUTO_MODE_SAFETY_CLASSIFIER_UNAVAILABLE_VAR_5} right now. Wait briefly and then try this action again. If it keeps failing, continue with other tasks that don't require this action and come back to it later. Note: reading files, searching code, and other read-only operations do not require the classifier and can still be used.

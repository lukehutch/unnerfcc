<!--
name: 'Tool Result: Auto mode hook changed input'
description: >-
  Explains that a tool call received no verdict because a hook modified its
  input after auto mode review.
ccVersion: 2.1.318
variables:
  - CLASSIFIER_NAME
  - TOOL_NAME
  - NEXT_STEPS
-->
${CLASSIFIER_NAME} gave no verdict for ${TOOL_NAME}: a hook changed this call's input after auto mode reviewed it, so the review does not cover what would run. This is not a judgment that the action is unsafe. ${NEXT_STEPS} 

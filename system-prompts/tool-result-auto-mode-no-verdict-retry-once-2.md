<!--
name: 'Tool Result: Auto mode no verdict retry once'
description: >-
  Instructs issuing an action once more when auto mode safety classifier
  unexpectedly gave no verdict.
ccVersion: 2.1.310
variables:
  - CLASSIFIER_NAME
  - ACTION_NAME
-->
${CLASSIFIER_NAME} gave no verdict for ${ACTION_NAME}: it expected this call not to need a review, but the call needed one. This is not a judgment that the action is unsafe. Issue the action again once, as-is; if it is denied again, do not issue it again: continue with other tasks that don't require it and tell the user that auto mode could not evaluate it. 

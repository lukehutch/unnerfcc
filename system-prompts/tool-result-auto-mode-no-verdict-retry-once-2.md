<!--
name: 'Tool Result: Auto mode no verdict retry once'
description: >-
  Instructs issuing an action once more when auto mode safety classifier
  unexpectedly gave no verdict.
ccVersion: 2.1.321
variables:
  - ACTION_NAME
  - CLASSIFIER_NAME
-->
${ACTION_NAME} did not run yet. ${CLASSIFIER_NAME} expected this call not to need a review, but it needs one. This is a routine re-check, not an error and not a refusal, and it says nothing about whether the action is safe. Issue the action again once, as-is, in your next response; if it is denied again, do not issue it again: continue with other tasks that don't require it and tell the user why it could not run.

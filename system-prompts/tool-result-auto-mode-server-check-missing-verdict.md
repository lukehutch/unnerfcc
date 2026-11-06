<!--
name: 'Tool Result: Auto mode server check missing verdict'
description: >-
  Informs the model that an action was not run because no server-side verdict
  covered it, and advises proceeding with unaffected work.
ccVersion: 2.1.318
variables:
  - ACTION_NAME
  - DETAILS
-->
${ACTION_NAME} was not run: Claude Code no longer checks actions itself, and no verdict from the check on Anthropic's servers covers this one${DETAILS}${ACTION_NAME}. This is not a judgment that the action is unsafe, and retrying will not help. Continue with work that doesn't need ${ACTION_NAME}. If the task needs it, stop and tell the user that it was not run because it could not be checked, so that they can decide how to go on. 

<!--
name: 'Tool Result: Auto mode safety classifier rate limited'
description: >-
  Reports that the auto mode safety classifier API instructed the session to
  wait.
ccVersion: 2.1.318
variables:
  - CLASSIFIER_NAME
  - WAIT_DURATION
  - WAIT_DETAILS
  - ACTION_DESCRIPTION
  - EXTRA_GUIDANCE
-->
The API told auto mode's safety classifier (${CLASSIFIER_NAME}) to wait ${WAIT_DURATION} from now${WAIT_DETAILS}${ACTION_DESCRIPTION}${EXTRA_GUIDANCE} until then. This is not a judgment that the action is unsafe, so don't rework the action to get around it. 

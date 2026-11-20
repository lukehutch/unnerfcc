<!--
name: 'Tool Result: Pin action takes only URL parameter'
description: >-
  Validation error stating that the given artifact action only accepts the
  specified parameter and extra parameters must be removed.
ccVersion: 2.1.329
variables:
  - ACTION_NAME
  - ALLOWED_PARAM_NAME
-->
action "${ACTION_NAME}" takes only ${ALLOWED_PARAM_NAME} — remove 

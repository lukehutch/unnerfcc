<!--
name: 'Tool Result: Cloud review produced no output'
description: >-
  Tells the model the cloud review returned nothing and to have the user retry
  /code-review ultra or fall back to a plain local /code-review.
ccVersion: 2.1.251
variables:
  - FAILURE_REASON
  - PR_POST_STATUS_NOTE
  - FOLLOW_UP_NOTE
-->

Cloud review did not produce output (${FAILURE_REASON}). Tell the user to retry /code-review ultra, or use plain /code-review for a local review instead.${PR_POST_STATUS_NOTE}${FOLLOW_UP_NOTE}

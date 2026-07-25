<!--
name: 'Tool Result: Cloud review produced no output'
description: >-
  Tells the model the cloud review returned nothing and to have the user retry
  /code-review ultra or fall back to a local /review.
ccVersion: 2.1.219
variables:
  - FAILURE_REASON
-->

Cloud review did not produce output (${FAILURE_REASON}). Tell the user to retry /code-review ultra, or use /review for a local review instead.

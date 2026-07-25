<!--
name: 'System Prompt: Cloud review fallback to local'
description: >-
  Tells the model it cannot launch the cloud review itself, that the user must
  type /code-review ultra, and that a local review at the given effort runs
  instead.
ccVersion: 2.1.219
variables:
  - REVIEW_EFFORT_LEVEL
-->
(Claude can't launch the cloud review directly — type `/code-review ultra` to run it. Falling back to a local ${REVIEW_EFFORT_LEVEL}-effort review for now.)


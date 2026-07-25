<!--
name: 'Tool Description: Code review ultra --fix unavailable'
description: >-
  Prefix telling the model it cannot launch the cloud `--fix` review itself and
  that a local review at the given effort level is running instead.
ccVersion: 2.1.219
variables:
  - REVIEW_EFFORT_LEVEL
-->
(Claude can't launch the cloud review directly — type `/code-review ultra --fix` to review in the cloud and apply the findings locally when it completes. Running a local ${REVIEW_EFFORT_LEVEL}-effort review and applying its findings for now.)


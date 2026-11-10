<!--
name: 'Tool Result: Auto mode no verdict shell moved after review'
description: >-
  Explains that auto mode gave no verdict because the shell changed directories
  after reviewing the call without its leading cd.
ccVersion: 2.1.321
variables:
  - CLASSIFIER_NAME
  - ACTION_NAME
-->
${CLASSIFIER_NAME} gave no verdict for ${ACTION_NAME}: auto mode reviewed this call without its leading cd, and the shell has moved since, so the review does not cover what would run

<!--
name: 'Tool Result: Claude Test confirm run outline overflow'
description: >-
  Validation error stating the outline exceeds dialog dimensions, advising
  shortening or AskUserQuestion.
ccVersion: 2.1.310
variables:
  - MAX_LINES
  - MAX_COLUMNS
-->
Nothing was asked: the outline does not fit whole in the ${MAX_LINES} lines of ${MAX_COLUMNS} columns it may take. Shorten its lines, or ask with AskUserQuestion, in the onboarding's words.

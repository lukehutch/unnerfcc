<!--
name: 'Tool Result: Permission answer input limit exceeded'
description: >-
  Informs the model that a tool call was not run because the permission response
  exceeded value, nesting, or character bounds.
ccVersion: 2.1.310
variables:
  - VALUE_COUNT
  - NESTING_LEVELS
  - CHAR_COUNT
-->
The call was not run. The permission answer gave it an input past what this session takes from an answer: ${VALUE_COUNT} values, ${NESTING_LEVELS} levels of nesting, ${CHAR_COUNT} characters of text. Nothing of the answer is in force.

<!--
name: 'Tool Result: Shader whole number range requirement'
description: >-
  Model-facing shader validation error requiring a field to be a whole number
  between 1 and the maximum.
ccVersion: 2.1.329
variables:
  - FIELD_NAME
  - MAX_VALUE
-->
${FIELD_NAME} is a whole number, 1 to ${MAX_VALUE}

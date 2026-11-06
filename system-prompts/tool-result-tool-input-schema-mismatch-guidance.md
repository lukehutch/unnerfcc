<!--
name: 'Tool Result: Tool input schema and correction guidance'
description: >-
  Provides the tool input schema and directs the model to verify and correct its
  input.
ccVersion: 2.1.318
variables:
  - INPUT_SCHEMA
  - FALLBACK_ACTION
-->
The input schema is: ${INPUT_SCHEMA}
If your input does not match this schema, correct it and call the tool again. If it matches, the error above has another cause. If the corrected call fails the same way, ${FALLBACK_ACTION}

<!--
name: 'Tool Result: Unrecognized parameter coerced to output_mode'
description: >-
  Informs the model that an unrecognized parameter was interpreted as a specific
  output_mode value.
ccVersion: 2.1.310
variables:
  - PARAM_NAME
  - TOOL_NAME
  - OUTPUT_MODE
-->
`${PARAM_NAME}` is not a ${TOOL_NAME} parameter and was read as `output_mode: "${OUTPUT_MODE}"`.

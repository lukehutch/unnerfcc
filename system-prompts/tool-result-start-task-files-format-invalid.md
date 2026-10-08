<!--
name: 'Tool Result: Start task files parameter invalid'
description: >-
  Informs the model that the files parameter in start_task must be a list of
  objects containing path properties.
ccVersion: 2.1.293
variables:
  - ERROR_PREFIX
  - PARAMETER_NAME
  - PROPERTY_NAME
  - MAX_LENGTH
  - ADDITIONAL_GUIDANCE
-->
${ERROR_PREFIX} `${PARAMETER_NAME}` must be a list of objects, each with a `${PROPERTY_NAME}` of at most ${MAX_LENGTH} characters, such as [{"${PROPERTY_NAME}": "/absolute/path/to/report.csv"}]. ${ADDITIONAL_GUIDANCE}

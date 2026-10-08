<!--
name: 'Tool Result: Start task file path not absolute'
description: >-
  Informs the model that an attached file path in start_task must be an absolute
  path.
ccVersion: 2.1.293
variables:
  - FILE_PATH
  - PATH_SCOPE
  - ADDITIONAL_GUIDANCE
-->
Cannot attach "${FILE_PATH}": ${PATH_SCOPE} file paths must be absolute paths as this session sees them. ${ADDITIONAL_GUIDANCE}

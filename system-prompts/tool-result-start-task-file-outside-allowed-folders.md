<!--
name: 'Tool Result: Start task file outside allowed folders'
description: >-
  Informs the model that files can only be attached from allowed session
  folders.
ccVersion: 2.1.293
variables:
  - FILE_NAME
  - ADDITIONAL_GUIDANCE
-->
Cannot attach "${FILE_NAME}": only files in this session's working folder (unless that is the home folder) or in its uploads or outputs folder can be attached, by the absolute path of a regular file there. ${ADDITIONAL_GUIDANCE}

<!--
name: 'Tool Result: Start task bidirectional text filename refused'
description: >-
  Informs the model that a file name contains characters that change text
  direction and cannot be attached.
ccVersion: 2.1.293
variables:
  - FILE_NAME
  - ADDITIONAL_GUIDANCE
-->
Cannot attach "${FILE_NAME}": its name contains a character that changes text direction, so the task could show it under a different name. Rename it, or copy it under a name without that character, and attach that. ${ADDITIONAL_GUIDANCE}

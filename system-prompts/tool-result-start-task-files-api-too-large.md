<!--
name: 'Tool Result: Start task file too large for Files API'
description: >-
  Informs the model that the Files API rejected a file because it exceeds the
  size limit.
ccVersion: 2.1.293
variables:
  - FILE_NAME
  - ADDITIONAL_GUIDANCE
-->
The Files API refused "${FILE_NAME}" as too large. ${ADDITIONAL_GUIDANCE}

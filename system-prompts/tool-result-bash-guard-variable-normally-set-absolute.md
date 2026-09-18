<!--
name: 'Tool Result: Path guard variable normally set (absolute path requirement)'
description: >-
  Requires a literal absolute path because the checked environment variable is
  normally set, rendering guards ineffective.
ccVersion: 2.1.277
variables:
  - ENV_VAR
  - OPERATION_TYPE
-->
use a literal absolute path: ${ENV_VAR} is normally set, so a guard on it would not stop this ${OPERATION_TYPE}

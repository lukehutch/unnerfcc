<!--
name: 'Tool Result: Dangerous shell operation detected'
description: >-
  Warning emitted when a dangerous command operation such as rm on an empty path
  is detected in bash input.
ccVersion: 2.1.277
variables:
  - OPERATION_TYPE
  - COMMAND
-->
Dangerous ${OPERATION_TYPE} operation detected in `${COMMAND}`

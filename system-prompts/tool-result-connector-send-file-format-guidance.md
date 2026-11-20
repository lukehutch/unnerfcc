<!--
name: 'Tool Result: Connector send file format guidance'
description: >-
  Model-facing guidance explaining the required format to send a local file
  versus JSON or literal text in a connector parameter.
ccVersion: 2.1.329
variables:
  - EXPECTED_FILE_FORMAT
  - PARAMETER_NAME
  - FAILURE_DETAIL
-->
To send a file on this computer, write it as ${EXPECTED_FILE_FORMAT}; anything else, a path too, is sent as it is written, but text that is JSON can be sent as what it holds. For ${PARAMETER_NAME}: ${FAILURE_DETAIL}

<!--
name: 'Tool Result: Quoted JSON string parameter rejected'
description: >-
  Error prefix explaining that a tool parameter was passed as a quoted JSON
  string instead of its expected native type.
ccVersion: 2.1.325
variables:
  - PARAMETER_NAME
  - EXPECTED_TYPE
  - ADDITIONAL_DETAIL
-->
 did not run: its "${PARAMETER_NAME}" came in quotes, as a string of JSON text, and not as ${EXPECTED_TYPE}. ${ADDITIONAL_DETAIL} Send the same 

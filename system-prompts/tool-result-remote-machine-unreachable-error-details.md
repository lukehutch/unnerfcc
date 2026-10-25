<!--
name: 'Tool Result: Remote machine unreachable error details'
description: Reports why a remote machine could not be reached and whether retry is safe.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
  - ERROR_DETAILS
  - EXTRA_ERROR_INFO
-->
${MACHINE_NAME} could not be reached from this session (${ERROR_DETAILS}${EXTRA_ERROR_INFO}); the call did not run.

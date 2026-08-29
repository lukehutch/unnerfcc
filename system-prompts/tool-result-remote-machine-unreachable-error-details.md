<!--
name: 'Tool Result: Remote machine unreachable error details'
description: Reports why a remote machine could not be reached and whether retry is safe.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - ERROR_DETAILS
-->
${MACHINE_NAME} could not be reached from this session (${ERROR_DETAILS}); the call did not run. If its Claude Code is not running or not attached to this session, ask the user to check it; a call that was too large to deliver will not succeed on a retry.

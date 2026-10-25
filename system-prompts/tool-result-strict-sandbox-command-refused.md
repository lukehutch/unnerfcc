<!--
name: 'Tool Result: Strict sandbox command refused'
description: >-
  Explains that a command did not run because strict sandbox mode is active and
  cannot be bypassed.
ccVersion: 2.1.310
variables:
  - SANDBOX_FAILURE_REASON
  - REMEDIATION_HINT
-->
The command did not run. Strict sandbox mode is on, so no command may run outside the sandbox, and ${SANDBOX_FAILURE_REASON}. ${REMEDIATION_HINT} Changing sandbox settings is for the user or their administrator to decide, not you. So is running this command, or one that does the same, through another tool or program.

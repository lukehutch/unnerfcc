<!--
name: 'Tool Result: Auto mode no verdict suggest manual approval mode'
description: >-
  Informs that auto mode had no verdict and suggests telling the user they can
  approve in another permission mode.
ccVersion: 2.1.318
variables:
  - WORK_GUIDANCE
-->
 was not run: auto mode has no safety result for this call, and nobody can be asked to approve it here. This is not a judgment that it is unsafe. ${WORK_GUIDANCE} then tell the user that auto mode has no safety result for it and that they can approve it themselves in another permission mode.

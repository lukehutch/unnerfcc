<!--
name: 'Tool Result: Dangerous rm check parse mismatch'
description: >-
  Model-facing error requiring explicit approval because shell parsing ambiguity
  prevented checking the command for dangerous rm operations.
ccVersion: 2.1.329
variables:
  - RESUBMIT_GUIDANCE
-->
This command could not be checked for dangerous rm operations: the shell may read it differently than it was parsed. This requires explicit approval.${RESUBMIT_GUIDANCE}

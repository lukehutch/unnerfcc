<!--
name: 'Tool Result: Sandbox exclusion parsing mismatch'
description: >-
  Explains that a command matched an exclusion pattern but was rejected because
  shell parsing differs.
ccVersion: 2.1.310
variables:
  - REJECTION_REASON
-->
${REJECTION_REASON}. The command matches a sandbox exclusion, but Bash would read part of it differently, so the exclusion does not cover it

<!--
name: 'Skill: Code Review (after the review)'
description: >-
  Tells the reviewer to invoke the verify command after reporting findings when
  the diff has a runtime surface, and to state which passes it ran.
ccVersion: 2.1.219
variables:
  - VERIFY_COMMAND_NAME
-->


## After the review

After the findings are reported (and applied, when --fix was passed): if `/${VERIFY_COMMAND_NAME}` has NOT run this session and the diff has a runtime surface (not test-only or docs-only per the pre-ship exemptions), invoke `/${VERIFY_COMMAND_NAME}` now — this review checks that the diff reads right; `/${VERIFY_COMMAND_NAME}` checks that it runs right. State which you did.

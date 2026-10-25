<!--
name: 'Tool Result: Claude Test start app try again accepted'
description: >-
  Handles user acceptance of retrying the dev server start, instructing a Bash
  restart and up check.
ccVersion: 2.1.310
variables:
  - START_INSTRUCTION
-->
They chose Try again (Accept): start it again ${START_INSTRUCTION} In the same message, right after that Bash call, call the up check with wait, as the run skill says.

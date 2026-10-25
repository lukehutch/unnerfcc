<!--
name: 'Tool Result: Claude Test retry duration tool or continue'
description: Instructs retrying the duration tool once or continuing without elapsed time.
ccVersion: 2.1.310
variables:
  - DURATION_TOOL_NAME
-->
Call ${DURATION_TOOL_NAME} once more. If it does not finish again, go on without the time, and say so under Notes.

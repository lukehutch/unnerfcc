<!--
name: 'Tool Result: Claude Test retry save call or block run'
description: >-
  Advises retrying the save tool once, ending with whole-run BLOCKED if it fails
  again.
ccVersion: 2.1.310
variables:
  - SAVE_TOOL_NAME
-->

This run cannot be recorded yet. Call ${SAVE_TOOL_NAME} once more. If that answer is an error again and does not end with "This run can still be recorded", end at once: your final message is the whole-run BLOCKED report, with that answer under its header, but not its last line.

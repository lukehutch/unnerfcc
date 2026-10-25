<!--
name: 'Tool Result: Claude Test run save not made'
description: >-
  Error stating drafts have not been saved and instructing to save drafts first
  or report whole-run BLOCKED.
ccVersion: 2.1.310
variables:
  - RUN_ID
  - SAVE_TOOL_NAME
-->
: the save of run ${RUN_ID} has not been made. In mode "run", call ${SAVE_TOOL_NAME} first. If it was refused, this run cannot be recorded: end now, with the whole-run BLOCKED report and the save's refusal in your final message. A first look records nothing.

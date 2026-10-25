<!--
name: 'Tool Result: Claude Test retry save check incomplete'
description: >-
  Advises retrying the save call and reporting potential incomplete save if
  already saved.
ccVersion: 2.1.310
variables:
  - SAVE_TOOL_NAME
-->
Call ${SAVE_TOOL_NAME} once more. If it answers that the drafts were already saved, the first save went through but may be incomplete: say so in your report, with the names you asked for.

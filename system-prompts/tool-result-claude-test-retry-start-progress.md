<!--
name: 'Tool Result: Claude Test retry start progress call'
description: >-
  Advises retrying the start progress call to read order, or proceeding without
  it.
ccVersion: 2.1.310
variables:
  - PROGRESS_TOOL_NAME
-->
Call ${PROGRESS_TOOL_NAME} with start: true once more; a second start only reads the progress file and gives the order. If it does not finish again, go on, and say so under Notes.

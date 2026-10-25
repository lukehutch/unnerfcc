<!--
name: 'Tool Result: Claude Test check if run finished or proceed'
description: >-
  Advises retrying the end-run tool or proceeding with final message if it does
  not finish.
ccVersion: 2.1.310
variables:
  - END_RUN_TOOL_NAME
-->
Call ${END_RUN_TOOL_NAME} once more: an answer that the run is finished means that results.json was written. If the command does not finish again, go on with your final message, and say so under Notes.

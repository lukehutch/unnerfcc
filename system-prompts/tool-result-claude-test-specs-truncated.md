<!--
name: 'Tool Result: Claude Test spec files truncated in answer'
description: >-
  Informs that spec file list was truncated and execution order comes from the
  progress start call.
ccVersion: 2.1.310
variables:
  - PROGRESS_TOOL_NAME
-->
this answer was too long, so the last spec files are left out of "files". The order in which to run the specs comes in the answer of your ${PROGRESS_TOOL_NAME} start call, before the first spec. Each spec's file is <stem>.md in the folder that "dir" names.

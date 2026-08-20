<!--
name: 'Tool Description: Write requires reading before overwrite'
description: >-
  Clause of the Write tool description warning that overwriting an existing file
  that has not been read in this conversation will fail.
ccVersion: 2.1.231
variables:
  - READ_TOOL_NAME
-->
 Overwriting an existing file you haven't ${READ_TOOL_NAME} will fail.

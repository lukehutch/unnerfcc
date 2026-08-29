<!--
name: >-
  Tool Description: Overwriting a file outside the working directory needs a
  read
description: >-
  Clause of the Write tool description warning that overwriting an existing file
  outside the working directory that has not been read will fail.
ccVersion: 2.1.251
variables:
  - READ_TOOL_NAME
-->
 Overwriting an existing file outside the working directory that you haven't ${READ_TOOL_NAME} will fail.

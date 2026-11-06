<!--
name: 'Tool Result: Working directory changed since permission check'
description: >-
  Explains that the working directory path changed or cannot be examined since
  permission check and instructs re-issuing the command.
ccVersion: 2.1.318
variables:
  - WORKING_DIRECTORY
-->
Working directory "${WORKING_DIRECTORY}" no longer leads where it did when this command was permission-checked (a part of the path was replaced, or can't be examined), so this command was not run. Re-issue the command to have it checked afresh.

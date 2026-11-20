<!--
name: 'Tool Result: Working directory missing and recreated empty'
description: >-
  Reports that a command did not run because its starting directory disappeared
  and was recreated empty, advising to verify before resending.
ccVersion: 2.1.329
variables:
  - COMMAND_NAME
  - DIRECTORY_PATH
-->
${COMMAND_NAME} was not run: the directory it was to start in was gone, and the files in it with it. It has been made again, empty. Check that this call still does what you mean there, then send it again. The directory: ${DIRECTORY_PATH}

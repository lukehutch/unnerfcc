<!--
name: 'Tool Result: Full command output file read instruction'
description: >-
  Informs the model that full command output is in a file and provides action
  guidance.
ccVersion: 2.1.318
variables:
  - OUTPUT_FILE_PATH
  - ACTION_DIRECTIVE
-->
 characters of the command's output, which is all that .stdout has. All of the output is in ${OUTPUT_FILE_PATH}. ${ACTION_DIRECTIVE} all of it.

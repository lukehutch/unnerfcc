<!--
name: 'Tool Result: Command output truncated stdout instruction'
description: >-
  Instructs how to access the saved portion of command output when stdout
  contains only partial results.
ccVersion: 2.1.318
variables:
  - CHARACTER_COUNT
  - SAVED_FILE_PATH
  - ACTION_DIRECTIVE
-->
 characters of the command's output, which is all that .stdout has. The command printed ${CHARACTER_COUNT} or more, and only its first ${CHARACTER_COUNT} were saved, to ${SAVED_FILE_PATH}. ${ACTION_DIRECTIVE} those ${CHARACTER_COUNT}.

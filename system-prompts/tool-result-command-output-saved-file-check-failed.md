<!--
name: 'Tool Result: Saved output file integrity check failed'
description: >-
  Explains that remaining command output in a saved file was not read back
  because integrity checks failed.
ccVersion: 2.1.318
variables:
  - SAVED_FILE_PATH
-->
 characters of the command's output. The rest was saved to ${SAVED_FILE_PATH}, and Claude Code did not read that file back, because the file did not pass the checks that it is the file the shell tool saved.

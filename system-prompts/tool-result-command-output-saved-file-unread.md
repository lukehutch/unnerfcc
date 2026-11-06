<!--
name: 'Tool Result: Command output saved file not read'
description: >-
  Explains that stdout only contains partial output and the referenced saved
  file was not read.
ccVersion: 2.1.318
variables:
  - SAVED_FILE_PATH
-->
 characters, which is all that the result has in stdout. The result gives ${SAVED_FILE_PATH} as a file that the output was saved to, and Claude Code did not read that file, so these characters may be only the start of the output.

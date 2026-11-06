<!--
name: 'Tool Result: Saved output file size mismatch'
description: >-
  Informs the model that a saved output file size does not match the counted
  output size, preventing read-back.
ccVersion: 2.1.318
variables:
  - SAVED_FILE_PATH
-->
 characters of the command's output. The saved file ${SAVED_FILE_PATH} does not have the size that the shell tool counted for the output, so Claude Code did not read the rest of it.

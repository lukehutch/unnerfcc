<!--
name: 'Tool Result: Command output partially saved to file'
description: >-
  Informs the model that only the first portion of large command output was
  saved to disk.
ccVersion: 2.1.318
variables:
  - OUTPUT_LIMIT
  - FILE_PATH
-->
The command printed ${OUTPUT_LIMIT} or more, and only its first ${OUTPUT_LIMIT}, as the command printed them, were saved, to ${FILE_PATH}.

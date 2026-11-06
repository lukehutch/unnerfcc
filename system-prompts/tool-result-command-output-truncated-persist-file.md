<!--
name: 'Tool Result: Command output truncated in persist file'
description: >-
  Informs the model that output beyond the persist limit was discarded and the
  file may end mid-line.
ccVersion: 2.1.318
variables:
  - PERSIST_LIMIT
  - SAVED_FILE_PATH
-->
 characters of the command's output. The command printed ${PERSIST_LIMIT} or more, and only its first ${PERSIST_LIMIT} were saved, to ${SAVED_FILE_PATH}. Anything after that was not kept, so the text can end in the middle of a line.

<!--
name: 'Tool Result: Output exceeded persist limit'
description: >-
  Informs the model that command output exceeded the persist limit and only the
  head was saved to a file.
ccVersion: 2.1.318
variables:
  - PERSIST_LIMIT
  - SAVED_FILE_PATH
-->
Output exceeded the ${PERSIST_LIMIT} persist limit; only the first ${PERSIST_LIMIT} were saved to: ${SAVED_FILE_PATH}

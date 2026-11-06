<!--
name: 'Tool Result: Design sync local path exceeds character limit'
description: >-
  Explains that a local path exceeds maximum character limits and halts the
  upload.
ccVersion: 2.1.318
variables:
  - FILE_PATH
  - MAX_CHARS
-->
write_files: the full path of the localPath for ${FILE_PATH} is longer than ${MAX_CHARS} characters, so it was not read. Nothing in this call was uploaded. Stop and ask the user how to proceed.

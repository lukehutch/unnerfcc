<!--
name: 'Tool Result: Design sync local path is not a regular file'
description: >-
  Explains that a path is not a regular file or was modified during checking and
  halts upload.
ccVersion: 2.1.318
variables:
  - FILE_PATH
-->
write_files: the localPath for ${FILE_PATH} is not a regular file, or it was moved or replaced while it was checked, so it was not read. Nothing in this call was uploaded. Stop and ask the user how to proceed.

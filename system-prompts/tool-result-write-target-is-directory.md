<!--
name: 'Tool Result: Target path is a directory not a file'
description: >-
  Error returned by file creation tools when the target path is a directory
  rather than a file.
ccVersion: 2.1.277
variables:
  - FILE_PATH
-->
${FILE_PATH} is a directory, not a file. To create a file inside it, include the file name in file_path.

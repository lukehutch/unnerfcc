<!--
name: 'Tool Result: Design sync hard link rejected'
description: >-
  Explains that a file at the local path is a hard link with unverifiable
  permissions and halts upload.
ccVersion: 2.1.318
variables:
  - FILE_PATH
-->
write_files: the file at the localPath for ${FILE_PATH} is a hard link (it has another name elsewhere whose read permission can't be checked), so it was not read. Nothing in this call was uploaded. Stop and ask the user how to proceed.

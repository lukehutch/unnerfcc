<!--
name: 'Tool Result: Design sync localPath requires user permission'
description: >-
  Explains that a local file path could not be read without interactive user
  permission and halts the upload.
ccVersion: 2.1.318
variables:
  - FILE_PATH
  - RULE_OR_SETTING
-->
write_files: the localPath for ${FILE_PATH} may not be read without asking the user, and write_files can't ask. The cause is a ${RULE_OR_SETTING} rule or setting, a network path, a link that can't be resolved, or a name Windows treats specially (such as NAME~1, or one ending in a dot) in the file's name or in any folder above it. Nothing in this call was uploaded. Stop and ask the user how to proceed.

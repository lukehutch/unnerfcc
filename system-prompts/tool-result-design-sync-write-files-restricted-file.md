<!--
name: 'Tool Result: Design sync restricted local file path'
description: >-
  Explains that a local path points to credentials, devices, or internal
  configuration files and halts upload.
ccVersion: 2.1.318
variables:
  - FILE_PATH
-->
write_files: the localPath for ${FILE_PATH} is or leads to a credential file, a device, or a file that Claude Code keeps for itself (its config and token folders), so it was not read. Nothing in this call was uploaded. Stop and ask the user how to proceed.

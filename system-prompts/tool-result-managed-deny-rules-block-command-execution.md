<!--
name: 'Tool Result: Managed deny rules block command execution'
description: >-
  Explains that managed deny rules prevent running commands that access
  indeterminate files on remote machines.
ccVersion: 2.1.318
variables:
  - COMMAND_TYPE
  - MACHINE_NAME
  - MANAGED_SETTINGS
-->
This session cannot tell which files a ${COMMAND_TYPE} command opens on ${MACHINE_NAME}, so it cannot check the command against the deny rules for the file tools in its managed settings (${MANAGED_SETTINGS}). It sends no ${COMMAND_TYPE} command to ${MACHINE_NAME} while those rules are set, and the user cannot approve one. A file tool's call there is checked against those rules.

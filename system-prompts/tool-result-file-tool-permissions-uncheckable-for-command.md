<!--
name: 'Tool Result: File tool permissions uncheckable for command'
description: >-
  Explains inability to check opened files against file tool permissions and
  directs using file tools directly.
ccVersion: 2.1.318
variables:
  - COMMAND_TYPE
  - MACHINE_NAME
  - FILE_TOOLS
-->
This session cannot tell which files a ${COMMAND_TYPE} command opens on ${MACHINE_NAME}, so it cannot check the command against its permission rules for the file tools (${FILE_TOOLS}), and this context cannot ask. A file tool's call there is checked against those rules.

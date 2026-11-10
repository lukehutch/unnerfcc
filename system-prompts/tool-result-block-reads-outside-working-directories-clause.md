<!--
name: 'Tool Result: Block reads outside working directories clause'
description: >-
  Notes that read restrictions outside working directories apply to connector
  attachment and output folders.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
 This session also blocks reads outside its working directories (permissions.blockReadsOutsideWorkingDirectories): a file in one of the folders kept for attachments and outputs is sent only if that setting lets the ${TOOL_NAME} tool read it.

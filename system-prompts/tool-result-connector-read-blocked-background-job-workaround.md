<!--
name: 'Tool Result: Connector read blocked background job workaround'
description: >-
  Explains read restrictions outside working directories and advises asking in a
  session without background jobs or adding directories.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
This session also blocks reads outside its working directories (permissions.blockReadsOutsideWorkingDirectories), so an attached file is sent only if that setting lets the ${TOOL_NAME} tool read it. To send this file, the user can ask in a session that runs no background job, which can send a file that is in the folder it was started in or in a folder added for it (--add-dir, or /add-dir with "Yes, for this session", or a folder allowed on a prompt), if that session may read it.

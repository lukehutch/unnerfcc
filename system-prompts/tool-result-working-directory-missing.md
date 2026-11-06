<!--
name: 'Tool Result: Working directory missing'
description: >-
  Reports that a command could not run because its starting working directory no
  longer exists.
ccVersion: 2.1.318
variables:
  - COMMAND_NAME
  - MISSING_DIRECTORY_PATH
-->
${COMMAND_NAME} was not run: the directory it was to start in is gone (deleted, moved, replaced by a link, or unreadable). Your next shell command will be refused as well, and its answer names the directory that calls start in from then on. Then send this call again. What is gone: ${MISSING_DIRECTORY_PATH}

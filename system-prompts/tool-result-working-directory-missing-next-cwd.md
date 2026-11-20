<!--
name: 'Tool Result: Working directory missing with next cwd'
description: >-
  Reports that a command did not run because its starting directory is gone and
  names the directory the next call will start in.
ccVersion: 2.1.329
variables:
  - COMMAND_NAME
  - NEXT_DIRECTORY_PATH
-->
${COMMAND_NAME} was not run: the directory it was to start in is gone (deleted, moved, replaced by a link, or unreadable). The next call starts in ${NEXT_DIRECTORY_PATH}. Check that this call still does what you mean there, then send it again.

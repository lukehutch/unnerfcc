<!--
name: 'Tool Result: Command approved pre-restart directory lost'
description: >-
  Explains that an approved command was not run because Claude Code restarted
  and could not return the shell to the original approval directory.
ccVersion: 2.1.321
variables:
  - DIRECTORY_ERROR_DETAIL
-->
This call was not run. The command was approved before Claude Code restarted, and Claude Code could not move the shell back to the directory where it was approved. ${DIRECTORY_ERROR_DETAIL} The shell's directory is 

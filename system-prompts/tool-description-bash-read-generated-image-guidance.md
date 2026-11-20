<!--
name: 'Tool Description: Bash read generated image guidance'
description: >-
  Model-facing guidance to chain a Read call right after a foreground command
  when inspecting a generated image file.
ccVersion: 2.1.329
variables:
  - READ_TOOL_NAME
  - BASH_TOOL_NAME
-->
- If you need to see a picture that a command will write and you know its path, call ${READ_TOOL_NAME} on that path in the same message, right after the ${BASH_TOOL_NAME} call. The calls run in order, so a command that finishes in the foreground will have written the file. Don't do this with 

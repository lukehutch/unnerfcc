<!--
name: 'Tool Result: File batch limit exceeded prefix'
description: >-
  Prefix reporting that a tool call exceeded the maximum number of files
  allowed.
ccVersion: 2.1.293
variables:
  - TOOL_NAME
  - MAX_FILES
-->
${TOOL_NAME} takes at most ${MAX_FILES} files; this call has 

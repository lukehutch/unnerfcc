<!--
name: 'Tool Result: Write file pre-read failed'
description: >-
  Informs the model that reading the file prior to overwriting failed and
  retrying may repeat the failure.
ccVersion: 2.1.321
variables:
  - ERROR_MESSAGE
  - TOOL_NAME
-->
Claude Code could not read the file that this call would write (${ERROR_MESSAGE}). Nothing was written, and no permission prompt was shown. ${TOOL_NAME} reads a file before replacing it, so a retry may fail the same way; if it does, tell the user.

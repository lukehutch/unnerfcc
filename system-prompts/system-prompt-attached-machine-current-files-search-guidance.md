<!--
name: 'System Prompt: Attached machine current files search guidance'
description: >-
  Instructions on specifying absolute paths and using the target machine for
  searching current files.
ccVersion: 2.1.251
variables:
  - PREFIX
  - TOOL_NAME
  - ACTION_DESCRIPTION
  - ARGUMENT_NAME
  - SHELL_TOOL
-->
${PREFIX} ${TOOL_NAME} ${ACTION_DESCRIPTION} on the user's current files there, under that machine's own permission rules — give file_path as an absolute path on that machine; without "${ARGUMENT_NAME}" they act on this session's snapshot. Searches made without "${ARGUMENT_NAME}" only see this session's snapshot: to search the user's current files run grep or find with ${SHELL_TOOL} there

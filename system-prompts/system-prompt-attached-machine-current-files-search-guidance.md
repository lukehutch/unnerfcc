<!--
name: 'System Prompt: Attached machine current files search guidance'
description: >-
  Instructions on specifying absolute paths and using the target machine for
  searching current files.
ccVersion: 2.1.263
variables:
  - PREFIX
  - TOOL_NAME
  - ACTION_DESCRIPTION
  - ARGUMENT_NAME_1
  - ARGUMENT_NAME_2
-->
${PREFIX} ${TOOL_NAME} ${ACTION_DESCRIPTION} on the user's current files there, under that machine's own permission rules — give paths (file_path, or a search's path) as absolute paths on that machine; without "${ARGUMENT_NAME_1}" they act on this session's snapshot. Searches made without "${ARGUMENT_NAME_1}" only see this session's snapshot: to search the user's current files ${ARGUMENT_NAME_2}

<!--
name: 'System Reminder: Attached machine absolute paths'
description: >-
  Instructs using absolute paths when targeting tools at the user's copy on an
  attached machine.
ccVersion: 2.1.277
variables:
  - BULLET_OR_PREFIX
  - TOOL_ACTION_OR_NAME
  - TOOL_PARAM_TARGET
  - PATH_SUFFIX_NOTE
  - PARAM_FLAG
-->
${BULLET_OR_PREFIX} ${TOOL_ACTION_OR_NAME} ${TOOL_PARAM_TARGET} on the user's copy there, under that machine's own permission rules — give paths (file_path, or a search's path) as absolute paths on that machine${PATH_SUFFIX_NOTE}; without "${PARAM_FLAG}" they act on this session's checkout. The same relative path names two different files, one in each copy, and they may differ: an edit to one does not change the other

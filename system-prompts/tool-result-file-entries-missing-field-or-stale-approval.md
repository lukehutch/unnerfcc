<!--
name: 'Tool Result: File entries missing field or stale approval'
description: >-
  Explains required file entry field format and handles invalidation of
  pre-restart approval.
ccVersion: 2.1.293
variables:
  - TOOL_NAME
  - FIELD_NAME
  - UPLOAD_TARGET
  - GUIDANCE
-->
${TOOL_NAME} file entries must give a `${FIELD_NAME}`; this client uploads the file and fills in the ${UPLOAD_TARGET} itself. If these ${UPLOAD_TARGET}s came from an approval given before Claude Code restarted, that approval cannot be reused: call ${TOOL_NAME} again with paths. ${GUIDANCE}

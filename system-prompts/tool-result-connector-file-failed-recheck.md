<!--
name: 'Tool Result: Connector file failed post-check recheck'
description: >-
  Informs the model that a file was not sent because it or session permissions
  changed and failed checks after the call was checked.
ccVersion: 2.1.329
variables:
  - FILE_NAME
  - EXTRA_DETAIL
  - FOLLOW_UP_GUIDANCE
-->
${FILE_NAME} was not sent: it no longer passed Claude Code's checks. The file, or what this session may send, may have changed since the call was checked.${EXTRA_DETAIL} ${FOLLOW_UP_GUIDANCE}
